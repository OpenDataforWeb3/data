import { formatUnits } from "ethers/lib/utils";
import { tokens } from "../config";
import { get_ipfs_data } from "../services/ipfs";
import {
  get_round,
  get_round_applications,
  get_round_votes,
} from "../services/subgraph";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function fetch_applications(network, roundId) {
  return get_round_applications(network, roundId)
    .then(({ data }) => data.round)
    .then(async (round) => {
      const pointer = round.projectsMetaPtr?.pointer;
      const extra = pointer ? await get_ipfs_data(pointer) : [];

      let projects = round.projects.map(async (project) => {
        const ipfs = await get_ipfs_data(project.metaPtr.pointer);
        const project_extra = extra.find((x) => x.id === project.id);
        const status = project_extra?.status ?? project.status;
        const payoutAddress = project_extra?.payoutAddress ?? project.status;
        return {
          ...project,
          ...ipfs.application,
          status,
          payoutAddress,
        };
      });
      projects = await Promise.all(projects);
      return projects;
    });
}

export async function fetch_votes(network, round, limit = 0) {
  const max_limit = 800;
  let votes = [];
  let lastId = "";

  // TODO come up with a better implementation for the limit
  for (let i = 0; i < max_limit; ++i) {
    await sleep(800);
    const { data } = await get_round_votes(
      network,
      round.id,
      round.votingStrategy.id,
      lastId
    );
    const qfVotes = data.qfvotes;

    if (!qfVotes || qfVotes?.length == 0) break;

    votes = votes.concat(qfVotes);
    lastId = qfVotes?.at(-1).id;
    if (!lastId) break;
    console.log(`pulled < ${(i + 1) * 1000} votes`);
  }

  return votes;
}

export async function fetch_data(network, roundId, options) {
  const res = await get_round(network, roundId);
  const { data } = await res.json();
  const round = data.round;

  const applications = options.applications
    ? await fetch_applications(network, roundId)
    : undefined;
  const raw_votes = options.votes
    ? await fetch_votes(network, round)
    : undefined;
  const votes = raw_votes?.map((vote) => {
    const symbol = tokens[network][vote.token].symbol ?? vote.token;
    const decimals = tokens[network][vote.token].decimals ?? 18;
    const amount = formatUnits(vote.amount, decimals).toString() ?? vote.amount;
    return { ...vote, token: symbol, amount: amount };
  });
  return {
    round,
    applications,
    votes,
  };
}
