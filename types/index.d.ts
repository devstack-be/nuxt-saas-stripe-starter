import type { User } from "@prisma/client";
declare module "nuxt/schema" {
  interface PublicRuntimeConfig {
    SiteUrl: string;
  }
}
declare module "@nuxt/schema" {
  interface PublicRuntimeConfig {
    SiteUrl: string;
  }
  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        SiteUrl: string;
      };
    };
  }
}
export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd?: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };

export type Frenquency = {
  value: "monthly" | "yearly";
  label: string;
  default?: boolean;
};
export type SubscriptionPlan = {
  mostPopular?: boolean;
  title: string;
  description: string;
  benefits: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};
