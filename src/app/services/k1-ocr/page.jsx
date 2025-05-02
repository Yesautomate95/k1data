import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DescriptionTab from "@/components/services/k1-ocr/DescriptionTab";
import TestEnvironmentTab from "@/components/services/k1-ocr/TestEnvironmentTab";

const K1OCR = () => {
  return (
    <div className="p-8 w-full ">
      <div className="text-2xl font-bold mb-4">K1 OCR </div>

      <Tabs defaultValue="description">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="test">Test Environment</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <DescriptionTab />
        </TabsContent>
        <TabsContent value="test">
          <TestEnvironmentTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default K1OCR;
