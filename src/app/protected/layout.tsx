import AdminNav from "../components/AdminNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
// set up a side nav bar to access generate quote, generate invoice, and view past quotes and invoices 
  return (
		<div className="flex flex-row gap-4">
		{children}
		<AdminNav/>
		</div>
  );
}
