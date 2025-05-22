// import Image from "next/image";
// import Link from "next/link";

const Logo = ({ size, className }) => {
  return (
    <Link href={"/"} className={className}>
      <div className="relative" style={{ width: `${size}px` }}>
        <Image
          src="/assets/alliance_trust_logo.svg"
          width={1000}
          height={1000}
          alt="Logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
