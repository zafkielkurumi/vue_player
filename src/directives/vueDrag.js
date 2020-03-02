import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, finalize, } from 'rxjs/operators';
export const drag = {
    bind: function (el, binding) {
        const mouseDown = fromEvent(el, 'mousedown', {capture:true,passive: true });
        const mouseMove = fromEvent(document, 'mousemove');
        const mouseUp = fromEvent(document, 'mouseup');
        function getTranslate() {

            const style = getComputedStyle(el)
            const regExp3d = /matrix3d\(([-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)/i;
            const regExp = /matrix\(([-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)/i;
            const result = style.transform.match(regExp) || style.transform.match(regExp3d);


            if (result) {
                const [, , x, y, z] = result;
                return {
                    x: parseFloat(x),
                    y: parseFloat(y),
                    z: parseFloat(z)
                }
            }
            return {
                x: 0,
                y: 0,
                z: 0
            }

        }
        const {onMouseEnd, onMouseMove} = binding.value;
        mouseDown.pipe(
            map((event) => ({
                pos: getTranslate(),
                event,
            })),
            switchMap((initialState) => {
                const initialPos = initialState.pos;
                const { clientX, clientY } = initialState.event
                return mouseMove.pipe(
                    map((moveEvent) => {

                        const distX = moveEvent.clientX - clientX + initialPos.x;
                        const distY = moveEvent.clientY - clientY + initialPos.y;
                        return {
                            x: distX, // 播放进度条
                            y: distY, // 声音
                            z: initialPos.z
                        }
                    }),
                    takeUntil(mouseUp),
                    finalize(() => onMouseEnd && onMouseEnd())
                )
            }),
        )
            .subscribe((pos) => {
                onMouseMove(pos)
            })
    }
}