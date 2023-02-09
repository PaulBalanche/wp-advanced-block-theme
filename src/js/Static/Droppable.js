import { useDroppable } from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id + '-droppable',
    data: { key: props.dataKey }
  });
  const style = {
    borderColor: isOver ? 'green' : undefined,
  };
  
  return (
    <div
        ref={setNodeRef}
        style={style}
        key={props.id}
        className={ "droppable " + props.className}
    >
      {props.children}
    </div>
  );
}