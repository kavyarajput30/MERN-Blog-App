import React from "react";
import { Sidebar } from "flowbite-react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromurl = urlParams.get("tab");
    if (tabFromurl) {
      setTab(tabFromurl);
    }
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56" aria-label="Sidebar">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/dashboard?tab=profile"
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
