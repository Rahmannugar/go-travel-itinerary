import Link from "next/link";
import EmptyActivityIcon from "../../Activity/icons/EmptyActivityIcon";

const EmptyHotel = () => {
  return (
    <div className="bg-white rounded flex flex-col justify-center h-[274px] gap-2 items-center">
      <EmptyActivityIcon />
      <h2 className="font-medium text-sm">No Request yet</h2>
      <Link
        href="/hotels"
        className="bg-custom-primary hover:bg-custom-primary-hover active:bg-custom-primary-hover transition-all hover:scale-105 active:scale-105 duration-200 ease-out text-white text-sm rounded px-6 py-3 font-medium"
      >
        Add Hotel
      </Link>
    </div>
  );
};
export default EmptyHotel;
