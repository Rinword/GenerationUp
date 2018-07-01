import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './cooldown.scss';

class CoolDown extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            currentTime: props.time,
            currentPercent: this.percent,
        };

        //
        // this.anglesStorage = {};
        // this.getAngle = deg => {
        //     if(this.anglesStorage[deg] !== undefined)
        //         return this.anglesStorage[deg];
        //     this.anglesStorage[deg] = (Math.PI * 2) / (360 / deg);
        //     return this.anglesStorage[deg];
        // }
    }

    componentWillReceiveProps({percent, time}) {
        if(percent !== this.state.currentPercent) {
            this.setState({currentTime: `${time.toFixed(1)}s.`, currentPercent: percent})
        }
    }

    // calcPercent = time => {
    //     return +(time / this.props.cooldown).toFixed(0);
    // }

    render() {
        const { children } = this.props;
        const { currentPercent, currentTime } = this.state;

        return (
            <div className={cx('ux-cooldown', this.props.className)}>
                {/*<canvas width="40px" height="40px" ref={ canvas => this.canvas = canvas} />*/}
                {!!currentPercent && <div className="ux-cooldown__bar" style={{width: `calc(100% - ${currentPercent}% - 4px`}}/>}
                {!!currentPercent && <div className="ux-cooldown__time">{currentTime}</div>}
                {children}
            </div>
        );
    }

    // componentDidMount() {
    //     this.mainStage = new createjs.Stage(this.canvas);
    //     let time = 60;
    //     const size = 40;
    //     const getAngle = this.getAngle;
    //
    //     function SpellCd(lifetimeMax, size){
    //         const shape = new createjs.Shape();
    //         shape.name = 'SHAPE';
    //         shape.lifetimeMax = lifetimeMax;
    //         shape.alpha = 0.5;
    //         shape.size = size;
    //         shape.size_2 = Math.round(size / 2);
    //         shape.width = size;
    //         shape.height = size;
    //         shape.update = function(lifetime){
    //             /* if you need border
    //             _this.lineStyle(2, 0x000000, 1);
    //             _this.beginFill(0xFFFFFF, 1);
    //             _this.drawRect(0, 0, _this.size, _this.size);*/
    //             if(lifetime <= 0){
    //                 shape.visible = false;
    //                 return;
    //             }
    //             // shape.clear();
    //
    //             let angle = ((shape.lifetimeMax - lifetime) / shape.lifetimeMax) * 2 * Math.PI;
    //             angle -= getAngle(90);
    //             if(angle < 0)
    //                 angle += getAngle(360);
    //             let x = Math.cos(angle);
    //             let y = Math.sin(angle);
    //             let a270 = angle > getAngle(270);
    //             let max = Math.max(Math.abs(x), Math.abs(y));
    //             if(max < 1){
    //                 y /= max;
    //                 x /= max;
    //             }
    //             x = x * shape.size_2 + shape.size_2;
    //             y = y * shape.size_2 + shape.size_2;
    //             shape.graphics.beginFill(0x000000);
    //             shape.graphics.moveTo(shape.size_2, shape.size_2);
    //             shape.graphics.lineTo(shape.size_2, 0);
    //
    //             if(angle > getAngle(225) && angle <= getAngle(270)){
    //                 shape.graphics.lineTo(x, y);
    //             }else{
    //                 shape.graphics.lineTo(0, 0);
    //             }
    //             if(angle < getAngle(255) || a270){
    //                 shape.graphics.lineTo(0, shape.size);
    //             }else{
    //                 shape.graphics.lineTo(x, y);
    //             }
    //             if(angle > getAngle(45) && !a270){
    //                 shape.graphics.lineTo(x, y);
    //             }else{
    //                 shape.graphics.lineTo(shape.size, shape.size);
    //             }
    //             if(a270) {
    //                 shape.graphics.lineTo(shape.size, 0);
    //             }
    //
    //             shape.graphics.lineTo(x, y);
    //             shape.graphics.lineTo(shape.size_2, shape.size_2);
    //             shape.graphics.endFill();
    //             shape.visible = true;
    //         }
    //         return shape;
    //     }
    //
    //     const cd = SpellCd(time, size);
    //     this.mainStage.addChild(cd);
    //
    //     // cd.addEventListener("tick", () => {
    //     //     cd.update(--time);
    //     //     console.log(time)
    //     //     if(time <= 0)
    //     //         time = cd.lifetimeMax;
    //     // });
    //
    //     function loop(){
    //         cd.update(--time);
    //         if(time <= 0)
    //             time = cd.lifetimeMax;
    //         requestAnimationFrame(loop);
    //     }
    //     loop();
    // }
}

CoolDown.propTypes = {
    percent: PropTypes.number,
    time: PropTypes.number,
    className: PropTypes.string,
};

CoolDown.defaultProps = {
    percent: 0,
    time: 0,
    className: '',
};

export default CoolDown;
