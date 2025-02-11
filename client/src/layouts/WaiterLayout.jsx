import WaiterSidebar from "../components/waiter/WaiterSidebar";

const WaiterLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-w-screen min-h-screen">
      <WaiterSidebar/>
      <main className="min-h-screen flex bg-gray-100">{children}</main>
    </div>
  );
};

export default WaiterLayout;