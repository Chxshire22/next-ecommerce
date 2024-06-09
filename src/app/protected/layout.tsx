import AdminNav from "../components/AdminNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// set up a side nav bar to access generate quote, generate invoice, and view past quotes and invoices 
  return (
		<div className=" p-4 min-h-dvh min-w-dvh">
		{children}
		<AdminNav/>
		</div>
  );
}
