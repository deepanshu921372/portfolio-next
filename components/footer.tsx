export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-6 bg-card border-t">
      <div className="container flex justify-center items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Deepanshu Sharma. All rights reserved.
        </p>
      </div>
    </footer>
  );
}