import { networks } from "../config";

export function get_round(network: string, roundId) {
  const endpoint = networks.find((x) => x.name === network)?.endpoint;

  if (endpoint === undefined) {
    throw Error("Network not defined");
  }

  const query = `
    {
      round(id: "${roundId}") {
        id
        applicationsStartTime
        applicationsEndTime
        roundStartTime
        roundEndTime
        roundMetaPtr {
          protocol
          pointer
        }
        program {
          id
          metaPtr {
            pointer
            protocol
          }
        }
        projectsMetaPtr {
          pointer
  				protocol
        }
        applicationMetaPtr {
          id
        }
        token
        votingStrategy {
          id
          strategyName
          strategyAddress
        }
        accounts {
          address
          role {
            role
          }
        }
        createdAt
        updatedAt
      }
    }
  `;
  const variables = [];

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((resp) => {
    if (resp.ok) {
      return resp;
    }

    return Promise.reject(resp);
  });
}

export function get_all_rounds(network: string) {
  const endpoint = networks.find((x) => x.name === network)?.endpoint;

  if (endpoint === undefined) {
    throw Error("Network not defined");
  }

  const query = `
    {
      rounds {
        id
        roundMetaPtr {
          protocol
          pointer
        }
      }
    }
  `;
  const variables = [];

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp);
  });
}

const query = `
    {
      round(id: "${""}") {
        id
        votingStrategy(first: 1000) {
          strategyName
          strategyAddress
          votes {
            id
            token
            amount
            from
            to
          }
        }
        createdAt
        updatedAt
        applicationsStartTime
        applicationsEndTime
        roundStartTime
        roundEndTime
        projects(first: 1000) {
          id
          createdAt
          updatedAt
          project
          status
          payoutAddress
          metaPtr {
            protocol
            pointer
          }
        }
        roundMetaPtr {
          protocol
          pointer
        }
        accounts {
          address
          role {
            role
          }
        }
      }
    }
  `;

export function get_round_applications(network: string, roundId: string) {
  const endpoint = networks.find((x) => x.name === network)?.endpoint;

  if (endpoint === undefined) {
    throw Error("Network not defined");
  }

  const query = `
    {
      round(id: "${roundId}") {
        projectsMetaPtr {
          pointer
  				protocol
        }

        projects(first: 1000) {
          id
          createdAt
          updatedAt
          project
          status
          payoutAddress
          metaPtr {
            protocol
            pointer
          }
        }
      }
    }
  `;
  const variables = [];

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp);
  });
}

export function get_round_votes(
  network: string,
  roundID: string,
  votingStrategyID: string,
  lastID: string,
  limit = 1000
) {
  const endpoint = networks.find((x) => x.name === network)?.endpoint;

  if (endpoint === undefined) {
    throw Error("Network not defined");
  }

  const query = `
    query votes ($limit: Int, $lastID: ID, $roundID: ID, $votingStrategyID: ID) {
        qfvotes (
            first: $limit,
            where: {
                id_gt: $lastID,
                votingStrategy_: {id: $votingStrategyID}
            }
        ) {
            id
            token
            amount
            from
            to
            createdAt
        }
    }
  `;
  const variables = {
    limit,
    lastID,
    roundID,
    votingStrategyID,
  };

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  }).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }

    return Promise.reject(resp);
  });
}
