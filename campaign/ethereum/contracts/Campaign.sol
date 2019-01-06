pragma solidity ^0.4.17;


contract CampaignFactory {
    address[] public delpoyedCampaigns;
    
    function createCampaign(uint minimum) public {
        //create new instance of Campaign
        address newCampaign = new Campaign(minimum,msg.sender);
        delpoyedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]) {
        return delpoyedCampaigns;
    }
}


contract Campaign {
    
   struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    
    // give access to functions
    modifier restricted {
        // only manager can run function
        require(msg.sender == manager);
        _;
    }
    
     function Campaign(uint minimum, address creator) public {
         // person creating the contract
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    //function creates a struct Request and adds it Request array
    function createRequest(string description, uint value, address recipient) public restricted {
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });

        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        // check if user contributed already to the campaign
        require(approvers[msg.sender]);
        // check if user already approved the request
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        // create a variable that refers to request struct
        Request storage request = requests[index];
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        request.recipient.transfer(request.value);
        request.complete = true;
    }
}