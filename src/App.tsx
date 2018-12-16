import * as React from 'react';

import { lsystemState, getValidLSystem } from './lsystem';

import Formula from './Components/Formula';
import Operation from './Components/Operation';



export default function App() {
  const { state, actions } = lsystemState();
  const canvasEl = React.useRef(null);

  const entries = state.entries.map(
    (e) => {
      const child =
        e.kind === 'formula'
        ? Formula({ ...e.value, onChange: (f) => actions.updateEntry(e.id, f)})
        : Operation({ ...e.value, onChange: (op) => actions.updateEntry(e.id, op)});

      return (
        <EntryControls
          key={e.id}
          child={child}
          onRemove={() => actions.removeEntry(e.id)}
        />
      );
    }
  );

  const system = getValidLSystem(state.entries);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
      }}>
      <div
        style={{
          marginRight: "1rem",
        }}
      >
        <h2>LSystem</h2>
        {entries}
        <button onClick={actions.addFormula}>
          Add formula
        </button>
        <button onClick={actions.addOperation}>
          Add operation
        </button>
        <div>
          {system.fold(
             (err) => err,
             () => '',
          )}
        </div>
      </div>
      <canvas
        style={{
          flexGrow: 1,
          border: "1px solid black",
        }}
        ref={canvasEl}
      />
    </div>
  );
}



type EntryControlsProps =
  { child: JSX.Element, onRemove: () => any };


function EntryControls(props: EntryControlsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {props.child}
      <button onClick={props.onRemove}>delete</button>
    </div>
  );
}