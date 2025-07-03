
import ChromeExtensionPopup from "@/components/ChromeExtensionPopup";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">
        {/* Main content panel */}
        <ResizablePanel defaultSize={75} minSize={50}>
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                QuickComm Brand SKU Scraper
              </h1>
              <p className="text-gray-600 max-w-md">
                Use the sidebar on the right to submit scrape requests for your product listings on quick commerce platforms.
              </p>
            </div>
          </div>
        </ResizablePanel>
        
        {/* Resizable handle */}
        <ResizableHandle withHandle />
        
        {/* Sidebar panel */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <ChromeExtensionPopup />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;
