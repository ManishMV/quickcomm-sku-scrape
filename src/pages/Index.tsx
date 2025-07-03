
import ChromeExtensionPopup from "@/components/ChromeExtensionPopup";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      {showSidebar ? (
        <ResizablePanelGroup direction="horizontal" className="min-h-screen">
          {/* Main content panel */}
          <ResizablePanel defaultSize={75} minSize={50}>
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  QuickComm Brand SKU Scraper
                </h1>
                <p className="text-gray-600 max-w-md">
                  Browse quick commerce platforms like Zepto, Blinkit, and Instamart to find your product listings, then use the sidebar to submit scrape requests.
                </p>
              </div>
            </div>
          </ResizablePanel>
          
          {/* Resizable handle */}
          <ResizableHandle withHandle />
          
          {/* Sidebar panel */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ChromeExtensionPopup onClose={() => setShowSidebar(false)} />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="h-full flex flex-col">
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                QuickComm Brand SKU Scraper
              </h1>
              <p className="text-gray-600 max-w-md">
                Browse quick commerce platforms like Zepto, Blinkit, and Instamart to find your product listings.
              </p>
              <Button 
                onClick={() => setShowSidebar(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Open Scraper Tool
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
