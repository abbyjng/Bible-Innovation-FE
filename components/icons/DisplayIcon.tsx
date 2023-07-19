interface Props {
  className?: string;
}

const DisplayIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_71_542)">
        <path d="M9.99997 14.9155C9.02783 14.9155 8.07751 14.6272 7.2692 14.0871C6.46089 13.547 5.83089 12.7793 5.45887 11.8812C5.08685 10.9831 4.98951 9.99476 5.17916 9.0413C5.36882 8.08783 5.83695 7.21202 6.52436 6.52461C7.21177 5.8372 8.08759 5.36906 9.04105 5.17941C9.99452 4.98975 10.9828 5.08709 11.881 5.45911C12.7791 5.83114 13.5468 6.46114 14.0869 7.26945C14.627 8.07776 14.9152 9.02807 14.9152 10.0002C14.9143 11.3035 14.3962 12.5532 13.4746 13.4748C12.553 14.3964 11.3033 14.9146 9.99997 14.9155ZM9.99997 6.77988C9.36305 6.77988 8.74043 6.96875 8.21085 7.3226C7.68127 7.67646 7.26851 8.17941 7.02477 8.76785C6.78103 9.35629 6.71725 10.0038 6.84151 10.6285C6.96577 11.2532 7.27248 11.827 7.72285 12.2773C8.17322 12.7277 8.74703 13.0344 9.37172 13.1587C9.9964 13.2829 10.6439 13.2192 11.2323 12.9754C11.8208 12.7317 12.3237 12.3189 12.6776 11.7893C13.0314 11.2598 13.2203 10.6371 13.2203 10.0002C13.2194 9.14641 12.8798 8.32782 12.2761 7.72409C11.6724 7.12035 10.8538 6.78078 9.99997 6.77988Z" />
        <path d="M10 3.72881C9.77529 3.72881 9.55973 3.63953 9.4008 3.4806C9.24187 3.32167 9.15259 3.10612 9.15259 2.88136V0.847458C9.15259 0.622698 9.24187 0.407144 9.4008 0.248215C9.55973 0.0892854 9.77529 0 10 0C10.2248 0 10.4404 0.0892854 10.5993 0.248215C10.7582 0.407144 10.8475 0.622698 10.8475 0.847458V2.88136C10.8475 3.10612 10.7582 3.32167 10.5993 3.4806C10.4404 3.63953 10.2248 3.72881 10 3.72881Z" />
        <path d="M10 20.0003C9.77529 20.0003 9.55973 19.911 9.4008 19.7521C9.24187 19.5932 9.15259 19.3776 9.15259 19.1528V17.1189C9.15259 16.8942 9.24187 16.6786 9.4008 16.5197C9.55973 16.3608 9.77529 16.2715 10 16.2715C10.2248 16.2715 10.4404 16.3608 10.5993 16.5197C10.7582 16.6786 10.8475 16.8942 10.8475 17.1189V19.1528C10.8475 19.3776 10.7582 19.5932 10.5993 19.7521C10.4404 19.911 10.2248 20.0003 10 20.0003Z" />
        <path d="M19.1526 10.8473H17.1187C16.8939 10.8473 16.6784 10.758 16.5195 10.599C16.3605 10.4401 16.2712 10.2246 16.2712 9.9998C16.2712 9.77504 16.3605 9.55949 16.5195 9.40056C16.6784 9.24163 16.8939 9.15234 17.1187 9.15234H19.1526C19.3774 9.15234 19.5929 9.24163 19.7518 9.40056C19.9108 9.55949 20.0001 9.77504 20.0001 9.9998C20.0001 10.2246 19.9108 10.4401 19.7518 10.599C19.5929 10.758 19.3774 10.8473 19.1526 10.8473Z" />
        <path d="M2.88136 10.8473H0.847458C0.622698 10.8473 0.407144 10.758 0.248215 10.599C0.0892854 10.4401 0 10.2246 0 9.9998C0 9.77504 0.0892854 9.55949 0.248215 9.40056C0.407144 9.24163 0.622698 9.15234 0.847458 9.15234H2.88136C3.10612 9.15234 3.32167 9.24163 3.4806 9.40056C3.63953 9.55949 3.72881 9.77504 3.72881 9.9998C3.72881 10.2246 3.63953 10.4401 3.4806 10.599C3.32167 10.758 3.10612 10.8473 2.88136 10.8473Z" />
        <path d="M15.0338 5.81366C14.866 5.81397 14.7018 5.76443 14.5622 5.67133C14.4225 5.57823 14.3137 5.44576 14.2494 5.29072C14.1851 5.13568 14.1684 4.96505 14.2012 4.80046C14.234 4.63587 14.315 4.48473 14.4338 4.36621L15.3931 3.40689C15.5522 3.24551 15.769 3.15395 15.9956 3.15236C16.2222 3.15078 16.4402 3.23928 16.6016 3.39841C16.763 3.55754 16.8545 3.77426 16.8561 4.00089C16.8577 4.22753 16.7692 4.44551 16.6101 4.60689L15.6507 5.56621C15.57 5.64707 15.4737 5.71069 15.3676 5.75323C15.2616 5.79576 15.148 5.81632 15.0338 5.81366Z" />
        <path d="M4.00669 16.8409C3.83886 16.8412 3.67472 16.7916 3.53507 16.6985C3.39543 16.6054 3.28658 16.473 3.22231 16.3179C3.15804 16.1629 3.14126 15.9922 3.17408 15.8276C3.20691 15.6631 3.28786 15.5119 3.40669 15.3934L4.36601 14.4341C4.52514 14.2749 4.74097 14.1855 4.96601 14.1855C5.19105 14.1855 5.40688 14.2749 5.56601 14.4341C5.72514 14.5932 5.81454 14.809 5.81454 15.0341C5.81454 15.2591 5.72514 15.4749 5.56601 15.6341L4.60669 16.6103C4.44413 16.7621 4.22901 16.8447 4.00669 16.8409Z" />
        <path d="M4.96605 5.81351C4.85466 5.81389 4.7443 5.79223 4.64132 5.74976C4.53834 5.70728 4.44479 5.64485 4.36605 5.56605L3.40673 4.60673C3.2476 4.4476 3.1582 4.23177 3.1582 4.00673C3.1582 3.78169 3.2476 3.56586 3.40673 3.40673C3.56586 3.2476 3.78169 3.1582 4.00673 3.1582C4.23177 3.1582 4.4476 3.2476 4.60673 3.40673L5.56605 4.36605C5.68488 4.48458 5.76584 4.63572 5.79866 4.80031C5.83149 4.9649 5.8147 5.13553 5.75043 5.29057C5.68617 5.44561 5.57731 5.57807 5.43767 5.67117C5.29803 5.76427 5.13388 5.81381 4.96605 5.81351Z" />
        <path d="M15.9932 16.8405C15.7708 16.8444 15.5557 16.7617 15.3932 16.61L14.4338 15.6507C14.2747 15.4915 14.1853 15.2757 14.1853 15.0507C14.1853 14.8256 14.2747 14.6098 14.4338 14.4507C14.593 14.2915 14.8088 14.2021 15.0338 14.2021C15.2589 14.2021 15.4747 14.2915 15.6338 14.4507L16.6101 15.393C16.7289 15.5116 16.8099 15.6627 16.8427 15.8273C16.8755 15.9919 16.8587 16.1625 16.7945 16.3176C16.7302 16.4726 16.6214 16.6051 16.4817 16.6982C16.3421 16.7913 16.1779 16.8408 16.0101 16.8405H15.9932Z" />
      </g>
      <defs>
        <clipPath id="clip0_71_542">
          <rect width="20" height="20" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DisplayIcon;
