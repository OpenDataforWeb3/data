import { get_ipfs_data } from "../services/ipfs";
import {
  get_all_rounds,
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

export async function fetch_votes(network, round) {
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

    console.log(qfVotes);
    votes = votes.concat(qfVotes);
    lastId = qfVotes?.at(-1).id;
    if (!lastId) break;
    console.log(`pulled < ${(i + 1) * 1000} votes`);
  }

  return votes;
}

// `
// Failed to get entities from store: unsupported filter ` > ` for value `null`
// query = from "sgd474820"."qf_vote"[*]{id > null
//   and join on votingStrategy with VotingStrategy(id = null)}
//   order id, block_range first 1000 at 54850469 query_id 77ecbeea2e5b6fdc-6f17ebc380210dbd
// `

export async function fetch_data(network, roundId, options) {
  const res = await get_round(network, roundId);
  console.log("res", res);
  const { data } = await res.json();
  const round = data.round;

  console.log("round", round);

  const applications = options.applications
    ? await fetch_applications(network, roundId)
    : undefined;
  const votes = options.votes ? await fetch_votes(network, round) : undefined;

  return {
    round,
    applications,
    votes,
  };
}
