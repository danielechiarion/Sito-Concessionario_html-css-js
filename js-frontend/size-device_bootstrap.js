/* returns the breakpoint based on the value */
export function getBootstrapBreakpoint() {
  if (window.matchMedia('(min-width: 1400px)').matches) return 'xxl';
  if (window.matchMedia('(min-width: 1200px)').matches) return 'xl';
  if (window.matchMedia('(min-width: 992px)').matches) return 'lg';
  if (window.matchMedia('(min-width: 768px)').matches) return 'md';
  if (window.matchMedia('(min-width: 576px)').matches) return 'sm';
  return 'xs';
}

/* returns the min-width for that type of device 
expressed in px*/
export function getBootstrapBreakPointValue(breakPoint){
    if(breakPoint === 'xxl') return 1400;
    if(breakPoint === 'xl') return 1200;
    if(breakPoint === 'lg') return 992;
    if(breakPoint === 'md') return 768;
    if(breakPoint === 'sm') return 576;

    return 0;
}