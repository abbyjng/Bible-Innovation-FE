interface Props {
  className?: string;
}

const FeedIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_71_501)">
        <path d="M16.4407 19.9996H3.55932C2.61561 19.9987 1.7108 19.6234 1.04349 18.9561C0.376185 18.2888 0.000897495 17.384 0 16.4403L0 10.3386C0.000897495 9.3949 0.376185 8.4901 1.04349 7.82279C1.7108 7.15548 2.61561 6.78019 3.55932 6.7793H16.4407C17.3844 6.78019 18.2892 7.15548 18.9565 7.82279C19.6238 8.4901 19.9991 9.3949 20 10.3386V16.4403C19.9991 17.384 19.6238 18.2888 18.9565 18.9561C18.2892 19.6234 17.3844 19.9987 16.4407 19.9996ZM3.55932 8.47421C3.06513 8.47511 2.59143 8.67182 2.24198 9.02127C1.89253 9.37072 1.69581 9.84442 1.69492 10.3386V16.4403C1.69581 16.9345 1.89253 17.4082 2.24198 17.7577C2.59143 18.1071 3.06513 18.3038 3.55932 18.3047H16.4407C16.9349 18.3038 17.4086 18.1071 17.758 17.7577C18.1075 17.4082 18.3042 16.9345 18.3051 16.4403V10.3386C18.3042 9.84442 18.1075 9.37072 17.758 9.02127C17.4086 8.67182 16.9349 8.47511 16.4407 8.47421H3.55932Z" />
        <path d="M16.7796 5.08456H3.22026C2.9955 5.08456 2.77995 4.99528 2.62102 4.83635C2.46209 4.67742 2.3728 4.46187 2.3728 4.23711C2.3728 4.01235 2.46209 3.79679 2.62102 3.63786C2.77995 3.47893 2.9955 3.38965 3.22026 3.38965H16.7796C17.0043 3.38965 17.2199 3.47893 17.3788 3.63786C17.5378 3.79679 17.627 4.01235 17.627 4.23711C17.627 4.46187 17.5378 4.67742 17.3788 4.83635C17.2199 4.99528 17.0043 5.08456 16.7796 5.08456Z" />
        <path d="M15.4237 1.69492H4.57622C4.35146 1.69492 4.1359 1.60563 3.97697 1.4467C3.81805 1.28777 3.72876 1.07222 3.72876 0.847458C3.72876 0.622698 3.81805 0.407144 3.97697 0.248215C4.1359 0.0892854 4.35146 0 4.57622 0L15.4237 0C15.6484 0 15.864 0.0892854 16.0229 0.248215C16.1818 0.407144 16.2711 0.622698 16.2711 0.847458C16.2711 1.07222 16.1818 1.28777 16.0229 1.4467C15.864 1.60563 15.6484 1.69492 15.4237 1.69492Z" />
      </g>
      <defs>
        <clipPath id="clip0_71_501">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FeedIcon;
