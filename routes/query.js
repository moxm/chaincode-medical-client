/**
 * @author Neel
 * @copyright 2017 Neel
 */
'use strict';

var log4js = require('log4js');
var logger = log4js.getLogger('QUERY');
logger.setLevel('DEBUG');

var hfc = require('fabric-client');
// var testutil = require('./util.js');
var Peer = require('fabric-client/lib/Peer.js');
var Chain = require('fabric-client/lib/Chain.js');
var Packager = require('fabric-client/lib/Packager.js');
var Orderer = require('fabric-client/lib/Orderer.js');

// var config = require('./config.json');
// var helper = require('./helper.js');

var client = new hfc();
var chain;

var _chain = null;
var chainName = 'test_cc';
var Client = hfc;
var client = new Client();


/*router.get('/:name', function (req, res) {
    // res.send('Hello World!')
    console.log("query > name: " + req.params.name);
    console.log(req.body);
    if (!chain) {
        init();
    }
    query(req, res);
})*/

get();

function get() {
    _chain = new Chain(chainName, client);
    var peer = new Peer('grpc://localhost:7051');
    _chain.addPeer(peer);
    // var test_peer = new Peer('grpc://localhost:7051');
    // _chain.setPrimaryPeer(test_peer);

    _chain.queryByChaincode({
        chaincodeId: 'test_cc',
        chainId: 'test_cc',
        fcn: 'invoke',
        args: ["query","b"],
        txId: 'blah',
        nonce: 'blah'
    }).then(function () {
        t.fail('Should not have been able to resolve the promise because of missing "chainId" parameter in queryByChaincode');
    }).catch(function (err) {
        if (err.message.indexOf('Missing "chainId" parameter in the proposal request') >= 0) {
            t.pass('Successfully caught missing chainId error');
        } else {
            t.fail('Failed to catch the queryByChaincode missing chainId error. Error: ' + err.stack ? err.stack : err);
        }
    });

    /*
    _chain.queryBlockByHash()
        .then(
            function(results) {
                logger.debug("queryBlockByHash > result :");
                logger.debug(results);
                // t.fail('Error: Blockhash bytes are required');
                // t.end();
            },
            function(err) {
                var errMessage = 'Error: Blockhash bytes are required';
                // if(err.toString() == errMessage) t.pass(errMessage);
                // else t.fail(errMessage);
                return _chain.queryTransaction();
            }
        ).then(
        function(results) {
            // t.fail('Error: Transaction id is required');
            // t.end();
        },
        function(err) {
            // t.pass(err);
            return _chain.queryBlock('a');
        }
    ).then(
        function(results) {
            // t.fail('Error: block id must be integer');
            // t.end();
        },
        function(err) {
            var errMessage = 'Error: Block number must be a postive integer';
            // if(err.toString() == errMessage) t.pass(errMessage);
            // else t.fail(errMessage);
            return _chain.queryBlock();
        }
    ).then(
        function(results) {
            // t.fail('Error: block id is required');
            // t.end();
        },
        function(err) {
            var errMessage = 'Error: Block number must be a postive integer';
            // if(err.toString() == errMessage) t.pass(errMessage);
            // else t.fail(errMessage);
            return _chain.queryBlock(-1);
        }
    ).then(
        function(results) {
            // t.fail('Error: block id must be postive integer');
            // t.end();
        },
        function(err) {
            var errMessage = 'Error: Block number must be a postive integer';
            // if(err.toString() == errMessage) t.pass(errMessage);
            // else t.fail(errMessage);
            return _chain.queryBlock(10.5);
        }
    ).then(
        function(results) {
            // t.fail('Error: block id must be integer');
            // t.end();
        },
        function(err) {
            var errMessage = 'Error: Block number must be a postive integer';
            // if(err.toString() == errMessage) t.pass(errMessage);
            // else t.fail(errMessage);
            // t.end();
        }
    ).catch(
        function(err) {
            // t.fail('should not have gotten the catch ' + err);
            // t.end();
        }
    );
    */

}

// init();
// query(null, null);
/*
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
        // chainId: config.channelID,
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
}*/
