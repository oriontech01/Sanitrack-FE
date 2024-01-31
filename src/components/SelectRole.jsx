import React from "react";
import "./SelectRole.scss";

const roles = [
  { label: "Cleaner", value: "Cleaner" },
  { label: "Inspector", value: "Inspector" },
];

const SelectRole = ({ navigation }) => {
  return (
    <div className="selectRoleContainer">
      <h1 className="titleText">Select A Role To Login As</h1>
      <select
        className="dropDownMenu"
        value={""}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      >
        <option value="" disabled>Select your Role</option>
        {roles.map((role, index) => (
          <option key={index} value={role.value}>{role.label}</option>
        ))}
      </select>
      <button
        onClick={() => {
        //   if (!userRole) navigation.navigate("Login");
        //   else navigation.navigate("WorkOrderSelection");
        console.log("It works")
        }}
        className="proceedButton"
      >
        Proceed
      </button>
    </div>
  );
};

export default SelectRole;
