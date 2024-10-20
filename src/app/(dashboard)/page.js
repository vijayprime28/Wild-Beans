import Card from "@/components/Card";
import { getItems } from "@/lib/db";

export default async function Home() {

  const items = JSON.parse(JSON.stringify(await getItems()));

  return (
    <div className="w-full h-full px-6 overflow-y-auto pt-10 lg:pt-20 pb-10 md:px-8 lg:px-20 xl:px-[28rem] font-poppins">

      <div className="flex flex-col items-start w-full gap-8">

        <div className="flex flex-col items-start w-full gap-4">

          <span className="text-xl font-medium">Hot Drink</span>


          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {
              items.filter((item) => item.type === "hot").map((item) => {
                return (
                  <Card key={item._id} item={item} />
                )
              })
            }
          </div>

        </div>

        <div className="flex flex-col items-start w-full gap-4">

          <span className="text-xl font-medium">Cold Drink</span>


          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {
              items.filter((item) => item.type === "iced").map((item) => {
                return (
                  <Card key={item._id} item={item} />
                )
              })
            }
          </div>

        </div>

      </div>


    </div>
  );
}
