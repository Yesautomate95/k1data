import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const k1Translations = {};

const defaultData = {};

export default function K1Table({ data = defaultData }) {
  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader>
        <CardTitle>K1 OCR Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border border-gray-300 rounded-lg w-full">
          <TableBody>
            {Object.entries(data).map(([key, value]) => (
              <TableRow key={key} className="border-b">
                <TableCell className="font-semibold border-r border-gray-300 w-1/3 whitespace-nowrap">
                  {k1Translations[key] || key}
                </TableCell>
                <TableCell className="whitespace-normal break-words">
                  {value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
