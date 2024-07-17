import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


const colors = ["red", "green", "blue", "yellow", "orange", "purple"];

const DriverBranch = () => {
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      setRefresh(prev => !prev); // Toggle state to force re-render
  }, []);
    const { AdminUser } = useSelector((state) => state.AdminLogin);
    const Drivers = AdminUser?.getalldrivers || [];
    console.log(Drivers);
      // Group drivers by branchName
  const groupedDrivers = Drivers.reduce((acc, driver) => {
    if (!acc[driver.branchName]) {
      acc[driver.branchName] = [];
    }
    acc[driver.branchName].push(driver);
    return acc;
  }, {});


  return (
    <DriverBranchContainer>
        {Object.keys(groupedDrivers).map((branchName, index) => (
            <BranchCard key={branchName} color={colors[index % colors.length]}>
                <h1>{branchName}</h1>
                {groupedDrivers[branchName].map((driver, idx) => (
                    <p key={branchName}>
                      {idx+1}.  {driver.name} - {driver.vehicle}
                    </p>
                ))}
            </BranchCard>
        ))}
    </DriverBranchContainer>
  );
} 

export default DriverBranch;

const DriverBranchContainer = styled.div`
    max-width: 1440px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
`;

const BranchCard = styled.div`
    background-color: ${(props) => props.color};
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 10px;
    text-align: center;
    width: 100%;
    max-width: 300px;

    > h1 {
        font-weight: bolder;
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
`;
