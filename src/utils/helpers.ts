import { NotificationFrequency, PlanFrequency } from "@prisma/client";

const dayjs = require("dayjs");

type billingType = {
  value: number;
  frequency: PlanFrequency;
};

export const parseBillingPeriod = (billingPeriod: string): billingType => {
  /**
   * Output: { value: 1, frequency: "month"}
   */
  // #1 - Eg: every day, every month, every year
  if (billingPeriod.split(" ").length < 3) {
    const [value, frequency] = billingPeriod.split(" ");
    return {
      value: 1,
      frequency: frequency as PlanFrequency,
    };
  } else {
    // #2 - Eg: every 2 day, every 2 month, every 2 year
    let [_, value, frequency] = billingPeriod.split(" ");
    return {
      value: Number(value),
      frequency: frequency as PlanFrequency,
    };
  }
};

export const returnPaymentNextDate = (
  paymentStartDate: string,
  billingPeriod: string
): string => {
  const { value, frequency } = parseBillingPeriod(billingPeriod);
  return dayjs(
    dayjs(dayjs(paymentStartDate).format("YYYY-MM-DD")).add(value, frequency)
  )
    .format("YYYY-MM-DD")
    .toString();
};

export const parseNotificationPeriod = (
  notificationPeriod: string
): NotificationFrequency => {
  /**
  map:
  - none -> none
  - 1 day before -> one_day_before
  - 3 day before -> three_day_before
   */

  if (notificationPeriod === "none") return "none";
  else if (notificationPeriod === "1 day before") return "one_day_before";
  else return "three_day_before";
};

export const returnHasNotification = (notification_type: string): boolean => {
  if (notification_type === "none") return false;
  else return true;
};
