import { useState } from 'react';

export default function Abas() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  }

  return (
    <Tabs activeIndex={activeTab} onTabChange={handleTabChange}>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
    </Tabs>
  );
}
