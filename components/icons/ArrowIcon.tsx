interface Props {
  className?: string;
}

const ArrowIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="11"
      viewBox="0 0 20 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M5.68496e-06 0.848482C-0.000379595 0.737096 0.0212879 0.626736 0.0637569 0.523764C0.106224 0.420792 0.168655 0.327244 0.24745 0.248514C0.407301 0.090777 0.622843 0.00233702 0.847418 0.00233703C1.07199 0.00233704 1.28753 0.090777 1.44739 0.248514L9.99947 8.81416L18.5515 0.248515C18.7107 0.0893934 18.9265 -4.92959e-08 19.1515 -3.70883e-08C19.3765 -2.48808e-08 19.5924 0.0893934 19.7515 0.248515C19.9106 0.407636 20 0.623451 20 0.848482C20 1.07351 19.9106 1.28933 19.7515 1.44845L10.5994 10.6005C10.4396 10.7582 10.224 10.8467 9.99947 10.8467C9.77489 10.8467 9.55935 10.7582 9.3995 10.6005L0.24745 1.44845C0.168655 1.36972 0.106224 1.27617 0.0637569 1.1732C0.0212879 1.07023 -0.000379604 0.959867 5.68496e-06 0.848482Z" />
    </svg>
  );
};

export default ArrowIcon;