import React, { useEffect, useRef, useState } from "react";
import { Divider } from "rsuite";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 o-auto pt-2 bg-grayish text-antique">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
