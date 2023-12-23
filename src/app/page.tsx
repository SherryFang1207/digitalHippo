import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instane Delicery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standard.",
  },
  {
    name: "For the planet",
    Icon: Leaf,
    description: "1% of our revenue will be used to improve our planet.",
  },
];

type Perk = {
  name: string;
  Icon: React.ComponentType<any>; // Use the appropriate type for your icons
  description: string;
};

type PerkCardProps = {
  perkDetail: Perk;
};

function PerkCard({ perkDetail: { name, Icon, description } }: PerkCardProps) {
  return (
    <div className="text-center md:flex md:items-start md:text-left lg:block lg:text-center">
      <div className="md:flex-shrink-0 flex justify-center">
        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
          <Icon className="w-1/3 h-1/3" />{" "}
          {/* Use the Icon component directly */}
        </div>
      </div>

      <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
        <h3 className="text-base font-medium text-gray-900">{name}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your marketplace for high-quality
            <span className="text-blue-600"> digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DigitalUnicorn. Every asset on our platform is verified
            by our team to ensure our highest quality standards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant="ghost"> Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* TODO: List Products */}
      </MaxWidthWrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <PerkCard key={perk.name} perkDetail={perk} />
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
