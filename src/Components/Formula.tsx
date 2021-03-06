import * as React from 'react';

import * as lsystem from '../lsystem/core';


export type FormulaProps =
  lsystem.Formula
  & { onChange: (p: FormulaProps) => any };


export default function Formula(props: FormulaProps) {
  return (
    <span
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <input
        size={1}
        value={props.label}
        onChange={(ev) => props.onChange({
          ...props,
          label: ev.target.value.toUpperCase()[0],
        })}
      />
      <span style={{margin: "0.5em"}}>=</div>
      <input
        value={props.value.join('')}
        onChange={(ev) => props.onChange({
          ...props,
          value: ev.target.value.toUpperCase().split(''),
        })}
      />
    </span>
  );
}
