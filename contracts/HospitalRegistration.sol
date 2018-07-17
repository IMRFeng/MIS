pragma solidity ^0.4.17;

contract HospitalRegistration {
    
    struct Hospital {
        string name;
        string tel;
        uint timestamp;
        string licenseNo;
        string province;
    }
    
    mapping(address => Hospital) hospitals;
    address[] hospitalAccts;
    
    function addNewHospital(address _address, string _name, string _tel, string _licenseNo, string _province) public {
        if (bytes(hospitals[_address].name).length != 0) {
            revert();
        }
        Hospital memory newHospital = Hospital(_name, _tel, now, _licenseNo, _province);
        hospitals[_address] = newHospital;
        hospitalAccts.push(_address);
    }
    
    function getHospitalCount() public view returns (uint) {
        return hospitalAccts.length;
    }
    
    function getHospital(address _key) public view returns (string, string, uint, string, string) {
        return (hospitals[_key].name, hospitals[_key].tel, hospitals[_key].timestamp, hospitals[_key].licenseNo, hospitals[_key].province);
    }
}