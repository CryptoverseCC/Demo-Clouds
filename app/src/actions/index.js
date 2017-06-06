/*global web3 */

var baseURL = 'https://api.userfeeds.io/beta';

var apiKey = '59049c8fdfed920001508e2a0c5a112e0d51468d5a4abbafacba8fb2';
var commonHeaders = {
  'Authorization': apiKey
}

var Contracts = {
  1: "TODO",
  3: "0xca14f04461bf292932d03f6646f5aa1f6c681fe1",
  4: "0x0f74f31f19c9f6b217965563a456607e7eb4b213",
  abi: [
    {
      constant: false,
      inputs: [
        {
          name: "data",
          type: "string"
        }
      ],
      name: "save",
      outputs: [],
      payable: false,
      type: "function"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          name: "sender",
          type: "address"
        },
        {
          indexed: false,
          name: "data",
          type: "string"
        }
      ],
      name: "Claim",
      type: "event"
    }
  ]
}




export const setProfile = (profile) => {
  return {
    type: 'SET_PROFILE',
    profile,
  };
};

export function getProfile () {
  return (dispatch, getState) => {
    setInterval(() => {
      if (typeof web3 === 'undefined') {
        return;
      }

      web3.eth.getAccounts((err, accounts) => {
        const { profile, clouds } = getState();
        const newProfile = accounts[0];
        if (newProfile && profile !== newProfile) {
          dispatch(setProfile(newProfile));
          if (clouds) {
            dispatch(getHoldings(clouds, newProfile));
          }
        }
      });

    }, 1000);
  };
}


export const setClouds = (clouds) => {
  return {
    type: 'SET_CLOUDS',
    clouds,
  };
};


export function getClouds () {
  return (dispatch, getState) => {
    fetch(`${baseURL}/api/contexts/`, {headers: commonHeaders})
    .then(response => response.json())
    .catch(() => ([]))
    .then(clouds => {
      if (!clouds) {
        return;
      }
      const { profile } = getState();

      dispatch(setClouds(clouds));
      if (profile) {
        dispatch(getHoldings(clouds, profile));
      }
    });
  };
}

export const setSponsoredClouds = (sponsored) => {
  return {
    type: 'SET_SPONSORED',
    sponsored,
  };
};


export function getSponsoredClouds () {
  return (dispatch) => {
    fetch(`${baseURL}/api/ranking/ropsten:0x24f51b44f038e41a4c91429bb8efa001e4b6b09f/sponsored`, {headers: commonHeaders})
    .then(response => response.json())
    .catch(() => ({
      items: []
    }))
    .then(clouds => {
      if (!clouds.items) {
        return;
      }

      dispatch(setSponsoredClouds(clouds.items));
    });
  };
}


export const setCloudAlgortihms = (id, algorithms) => {
  return {
    type: 'SET_CLOUD_ALGORITHMS',
    id,
    algorithms,
  };
};


export function getCloudAlgorithms (id) {
  return (dispatch) => {
    fetch(`${baseURL}/api/ranking/${id}/`, {headers: commonHeaders})
    .then(response => response.json())
    .catch(() => ({items:[]}))
    .then((content) => {
      dispatch(setCloudAlgortihms(id, content.items));
      dispatch(getCloudContent(id, content.items[0].identifier));
    });
  };
}


export const setCloudContent = (id, algorithm, items) => {
  return {
    type: 'SET_CLOUD_CONTENT',
    id,
    algorithm,
    items
  };
};


export function getCloudContent (id, algorithm) {
  return (dispatch) => {
    fetch(`${baseURL}/api/ranking/${id}/${algorithm}`, {headers: commonHeaders})
    .then(response => response.json())
    .catch(() => ({items:[]}))
    .then((content) => {
      dispatch(setCloudContent(id, algorithm, content.items));
    });
  };
}


export const setHoldings = (holdings) => {
  return {
    type: 'SET_HOLDINGS',
    holdings,
  };
};


export function getHoldings (clouds, profile) {
  return (dispatch) => {
    var requests = [];
    for (let cloudId in clouds) {
      let request = fetch(`${baseURL}/api/tokens/${cloudId}/${profile}`, {headers: commonHeaders})
        .then(response => response.json())
        .catch(() => ({
          context: cloudId,
          identifier: profile,
          balance: 0
        }))
      requests.push(request);
    }
    return Promise.all(requests).then(results => {
      var holdings = {};
      for (let i = results.length - 1; i >= 0; i--) {
        holdings[results[i].context] = results[i].balance / Math.pow(10, results[i].decimals);
      }
      dispatch(setHoldings(holdings));
    });
  }
}


export function pairingTargetChange (target) {
  return {
    type: 'PAIRING_TARGET_CHANGE',
    target,
  };
}


export function pairingScanError (error) {
  return {
    type: 'PAIRING_SCAN_ERROR',
    error,
  };
}


export function pairingSuccess () {
  return {
    type: 'PAIRING_SUCCESS',
  };
}


export function pairingError (error) {
  return {
    type: 'PAIRING_ERROR',
    error,
  };
}

export function pairingSubmit (target) {
  let contractAddress = Contracts[web3.version.network];

  let ClaimsContract = web3.eth.contract(Contracts.abi).at(contractAddress);

  return (dispatch, getState) => {
    const { profile } = getState();

    let claim = {
      context: "userfeeds:pairing",
      type: ["Claim"],
      claim: {
        target: target
      },
      credits: [
        {
          type: "interface",
          value: window.location.href
        }
      ]
    }

    ClaimsContract.save(JSON.stringify(claim), {from: profile}, (err) => {
      if (err) {
        throw Error(err);
      }
      dispatch(pairingSuccess())
    });
  }
}

export const importKeys = (keys) => {
  return setKeys(...(keys.split(":")));
};

export const setKeys = (publicKey, privateKey) => {
  return {
    type: 'SET_KEYS',
    publicKey,
    privateKey
  };
};


export function getKeys () {
  return (dispatch) => {
    authService({
      "apiKey": "ABCDEFG",
      "method": "getPublicKey",
      "args": []
    }, function (e) {
      if (!e.data.hasOwnProperty("error")){
        let publicKey = e.data.result;
        dispatch(pairingTargetChange(publicKey));
      }
    });
  };
}


export function cloudDetailsOpen () {
  return {
    type: 'CLOUD_DETAILS_OPEN',
  };
}


export function submitTarget (context, target, transport) {
  return (dispatch, getState) => {
    let claim = {
      "context": context,
      "type": ["Claim"],
      "claim": {
        "target": target
      },
      "credits": [
        {
          "type": "interface",
          "value": window.location.href
        }
      ]
    };

    sendClaim(dispatch, getState, claim, transport);
  };
}

export function endorseTarget (context, target, label, transport) {
  return (dispatch, getState) => {

    let claim = {
      "context": context,
      "type": ["Claim", "Label"],
      "claim": {
        "target": target,
        "labels": [label]
      },
      "credits": [
        {
          "type": "interface",
          "value": window.location.href
        }
      ]
    };

    sendClaim(dispatch, getState, claim, transport);
  };
}

function sendClaim(dispatch, getState, claim, transport) {
  switch (transport) {
  case 'http':
    sendClaimHTTP(dispatch, getState, claim);
    break;
  case 'shh-public':
    sendClaimShhPublic(dispatch, getState, claim);
    break;
  case 'shh-private':
    sendClaimShhPrivate(dispatch, getState, claim);
    break;
  case 'transaction':
    sendClaimTransaction(dispatch, getState, claim);
    break;
  default:
    throw Error("Invalid Transport in sendClaim");
  }
}

function authService(params, callback) {
  let authIframe = document.getElementById("auth");

  if (authIframe) {
    let otherWindow = authIframe.contentWindow;

    let channel = new MessageChannel();
    channel.port1.onmessage = callback;
    otherWindow.postMessage(
      params,
      "http://localhost:3000/",
      [channel.port2]
    );
  }
  else {
    setTimeout(() => {
      authService(params, callback);
    }, 1000);
  }
}

function sendClaimHTTP(dispatch, getState, claim) {
  authService({
    "apiKey": "ABCDEFG",
    "method": "signMsg",
    "args": [JSON.stringify(claim)]
  }, function (e) {
    if (!e.data.hasOwnProperty("error")){
      claim.signature = e.data.result;
      fetch(`${baseURL}/api/storage/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...commonHeaders
        },
        body: JSON.stringify(claim)
      })
        .then(response => response.json())
        .catch(() => ("ERROR"))
        .then(result => {
          dispatch(claimSent(result));
        });
    }
  });
}

function sendClaimShhPublic(dispatch, getState, claim) {
  // build message object
  var message = {
    from: localStorage.getItem("shh"),
    topics: [web3.fromAscii("claim")],
    payload: web3.fromAscii(JSON.stringify(claim)),
    ttl: 60 * 60 * 2, // 2h
  };

  web3.shh.post(message, function (err, result) {
    if (err) {
      throw Error(err);
    }
    dispatch(claimSent(result));
  });
}

function sendClaimShhPrivate(dispatch, getState, claim) {
  var message = {
    from: localStorage.getItem("shh"),
    topics: [web3.fromAscii("claim")],
    to: "TODO: setup userfeeds node to listen to whisper messages",
    payload: web3.fromAscii(JSON.stringify(claim)),
    ttl: 60 * 60 * 2, // 2h
  };

  web3.shh.post(message, function (err, result) {
    if (err) {
      throw Error(err);
    }
    dispatch(claimSent(result));
  });
}

function sendClaimTransaction(dispatch, getState, claim) {
  const { profile } = getState();

  let contractAddress = Contracts[web3.version.network];

  let ClaimsContract = web3.eth.contract(Contracts.abi).at(contractAddress);

  ClaimsContract.save(JSON.stringify(claim), {from: profile}, (err, result) => {
    if (err) {
      throw Error(err);
    }
    dispatch(claimSent(result));
  });
}


export function claimSent (result) {
  return {
    type: 'CLAIM_SENT',
    result: result
  };
}
