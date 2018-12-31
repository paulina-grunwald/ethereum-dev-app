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
    mapping(address => bool) public approvers;
    
    // give access to functions
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
        approvers[msg.sender] = true;
    }
    
    //function creates a struct Request and adds it Request array
    function createRequest(string description, uint value, address recipient) 
      
        public restricted {
            // create new request in memory
            Request memory newRequest = Request({
               description: description,
               value: value,
               recipient: recipient,
               complete: false
            });
            
            request.push(newRequest);
    }
}