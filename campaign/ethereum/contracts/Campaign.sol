pragma solidity ^0.4.17;

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public request;
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    
    modifier restricted {
        // only manager can run function
        require(msg.sender == manager);
        _;
    }
    
    function Campain(uint minimum) public {
        // person creating the contract
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }
    function createRequest(string description, uint value, address recipient) 
        public restricted {
            Request newRequest = Request({
               description: description,
               value: value,
               recipient: recipient,
               complete: false
            });
            
            request.push(newRequest);
    }
}