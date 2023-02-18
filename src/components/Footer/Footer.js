import React from 'react';
import { FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="mt-10 text-center">
      Developed with ❤ by LH Fahim{' '}
      <a target="_blank" href="https://twitter.com/LHFahim_" rel="noreferrer">
        {' '}
        <FaTwitter className="inline" />{' '}
      </a>{' '}
    </div>
  );
};

export default Footer;
