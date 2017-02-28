/**
 * @author Neel
 * @copyright 2017 Neel
 */
'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('QUERY');
logger.setLevel('DEBUG');

var hfc = require('fabric-client');
var utils = require('fabric-client/lib/utils.js');
var Peer = require('fabric-client/lib/Peer.js');
var Orderer = require('fabric-client/lib/Orderer.js');

var config = require('./config.json');
var helper = require('./helper.js');

var client = new hfc();
var chain;


/*router.get('/:name', function (req, res) {
    // res.send('Hello World!')
    console.log("query > name: " + req.params.name);
    console.log(req.body);
    if (!chain) {
        init();
    }
    query(req, res);
})*/
init();
query(null, null);
function query(req, res) {
    var targets = [];
    for (var i = 0; i < config.peers.length; i++) {
        targets.push(config.peers[i]);
    }
    var args = helper.getArgs(config.queryRequest.args);
	//chaincode query request
    var request = {
        targets: targets,
        chaincodeId: config.chaincodeID,
        chainId: config.channelID,
        txId: utils.buildTransactionID(),
        nonce: utils.getNonce(),
        fcn: config.queryRequest.functionName,
        args: args
    };

    chain.queryByChaincode(request).then(
        function(response_payloads) {
            for (let i = 0; i < response_payloads.length; i++) {
                logger.info('############### Query results after the move on PEER%j, User "b" now has  %j', i, response_payloads[i].toString('utf8'));
            }
        }
    ).catch(
        function(err) {
            logger.error('Failed to end to end test with error:' + err.stack ? err.stack : err);
        }
    );
}

function init() {
    chain = client.newChain(config.chainName);
    chain.addOrderer(new Orderer(config.orderer.orderer_url));
    for (var i = 0; i < config.peers.length; i++) {
        chain.addPeer(new Peer(config.peers[i].peer_url));
    }
}


/*
hfc.newDefaultKeyValueStore({
	path: config.keyValueStore
}).then(function(store) {
	client.setStateStore(store);
	return helper.getSubmitter(client);
}).then(
	function(admin) {
		logger.info('Successfully obtained enrolled user to perform query');

		logger.info('Executing Query');
		var targets = [];
		for (var i = 0; i < config.peers.length; i++) {
			targets.push(config.peers[i]);
		}
		var args = helper.getArgs(config.queryRequest.args);
		//chaincode query request
		var request = {
			targets: targets,
			chaincodeId: config.chaincodeID,
			chainId: config.channelID,
			txId: utils.buildTransactionID(),
			nonce: utils.getNonce(),
			fcn: config.queryRequest.functionName,
			args: args
		};
		// Query chaincode
		return chain.queryByChaincode(request);
	}
).then(
	function(response_payloads) {
		for (let i = 0; i < response_payloads.length; i++) {
			logger.info('############### Query results after the move on PEER%j, User "b" now has  %j', i, response_payloads[i].toString('utf8'));
		}
	}
).catch(
	function(err) {
		logger.error('Failed to end to end test with error:' + err.stack ? err.stack : err);
	}
);*/
