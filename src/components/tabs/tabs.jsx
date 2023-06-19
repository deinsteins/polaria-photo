import { useState } from "react";
import PropTypes from "prop-types";

const Tabs = ({ tabs }) => {
  const [currentTab, setCurrentTab] = useState("1");

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between">
        {tabs.map((tab, i) => (
          <button
            className="bg-[#494949] text-color[#888888] cursor-pointer p-6 w-full bg-[rgba(255, 255, 255, 0.1)] ease-out hover:text-white hover:bg-[rgba(255, 255, 255, 0.15)] disabled:text-white"
            key={i}
            id={tab.id}
            disabled={currentTab === `${tab.id}`}
            onClick={handleTabClick}
          >
            {tab.tabTitle}
          </button>
        ))}
      </div>
      <div className="px-[80px] py-[50px] bg-white ">
        {tabs.map((tab, i) => (
          <div key={i}>
            {currentTab === `${tab.id}` && (
              <div>
                <p className="title">{tab.title}</p>
                <p>{tab.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tabTitle: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default Tabs;
