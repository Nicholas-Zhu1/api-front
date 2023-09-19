import { DefaultFooter } from '@ant-design/pro-components';
import React from "react";
const Footer: React.FC = () => {
  const defaultMessage = 'BliBli视频网站';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'BliBli',
          title: 'BliBli',
          href: 'https://www.bilibili.com/',
          blankTarget: true,
        },

      ]}
    />
  );
};
export default Footer;
