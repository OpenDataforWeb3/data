import React from "react";
import Select, { SelectValue } from "./Select";
import { hide_list, networks } from "../config";
import { useEffect, useState } from "react";
import { get_all_rounds } from "../services/subgraph";
import { get_ipfs_data } from "../services/ipfs";
import { fetch_data } from "../utils/data";
import { Output } from "./Output";

export default function GraphData() {
  const [network, setNetwork] = useState("fantom");
  const [rounds, setRounds] = useState<SelectValue[]>([]);
  const [round, setRound] = useState<SelectValue | undefined>(undefined);
  const [currentRound, setCurrentRound] = useState();
  const [votes, setVotes] = useState(undefined);
  const [withApplications, setWithApplications] = useState(false);
  const [withVotes, setWithVotes] = useState(false);
  const [projects, setProjects] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRounds([]);
    setRound(undefined);
    get_all_rounds(network)
      .then(({ data }) => data.rounds)
      .then((rounds) => {
        return rounds.filter((x) => !hide_list[network]?.includes(x.id));
      })
      .then((rounds) => {
        const ps = rounds.map(async (round) => {
          const meta_data = await get_ipfs_data(round.roundMetaPtr.pointer);
          return { ...round, meta_data: meta_data };
        });
        return Promise.all(ps);
      })
      .then((rounds) => {
        const values = rounds.map((x): SelectValue => {
          return { label: x.meta_data.name, name: x.id };
        });
        return values;
      })
      .then((values) => {
        setRounds(values);
        setRound(values[0]);
      });
  }, [network]);

  return (
    <div className="nx-mt-5">
      <div className="nx-mb-3">
        Chain:{" "}
        <Select
          values={networks}
          value={network}
          onChange={(e) => setNetwork(e.target.value)}
        />
        <br />
        round:{" "}
        <Select
          values={rounds}
          onChange={(e) =>
            setRound(rounds.find((x) => x.name == e.target.value))
          }
        />
        <br />
        <label>
          <input type="checkbox" checked disabled />
          Round information
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={withApplications}
            onChange={() => setWithApplications((x) => !x)}
          />
          Projects / applications
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={withVotes}
            onChange={() => setWithVotes((x) => !x)}
          />
          Votes
        </label>
        <br />
        <button
          disabled={loading}
          className={[
            "nextra-button nx-transition-all active:nx-opacity-50",
            "nx-bg-primary-700/5 nx-border nx-border-black/5 nx-text-gray-600 hover:nx-text-gray-900 nx-rounded-md nx-p-1.5",
            "dark:nx-bg-primary-300/10 dark:nx-border-white/10 dark:nx-text-gray-400 dark:hover:nx-text-gray-50",
          ].join(" ")}
          onClick={() => {
            setLoading(true);
            fetch_data(network, round.name, {
              applications: withApplications,
              votes: withVotes,
            })
              .then((data) => {
                setCurrentRound(data.round);
                data.applications && setProjects(data.applications);
                data.votes && setVotes(data.votes);
              })
              .finally(() => setLoading(false));
          }}
        >
          Fetch the data
        </button>
      </div>
      {loading ? (
        "Loading..."
      ) : (
        <Output currentRound={currentRound} projects={projects} votes={votes} />
      )}
    </div>
  );
}
