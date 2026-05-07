import styles from "./styles.module.scss";
import { ShopifyIcon, StarIcon } from "@/components/icons";
import Image from "next/image";

const PartnerWidget = () => {
  return (
    <div className={styles.widget}>
      <span className={styles.widget__shopify}>
        {/* <ShopifyIcon /> */}
        <Image
          src={"/images/shopify-icon.svg"}
          width={25}
          height={25}
          alt="image"
        />
      </span>

      <div className={styles.widget__content}>
        <div className={styles.widget__rating}>
          <span className={styles.widget__rating_value}>4.8</span>
          <div className={styles.widget__rating_stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span className={styles.widget__rating_star} key={i}>
                <StarIcon />
              </span>
            ))}
          </div>
        </div>

        <p className={styles.widget__text}>Certified Shopify partner</p>
      </div>
    </div>
  );
};

export default PartnerWidget;
