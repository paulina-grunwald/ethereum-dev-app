pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    // create dynamic array that can only contain addresses
    address[] public players;
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    function random() public view returns (uint){
       return uint(keccak256(block.difficulty, now, players));
    }
    function pickWinner() public {
        //get random index of the player in arrays of players
        uint index = random() % players.length;
        // get address of the player
        // transfer all money from the contract and sent to selected address
        players[index].transfer(this.balance);
    }

}