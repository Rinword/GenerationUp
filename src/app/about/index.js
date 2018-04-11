import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Row, Column } from 'ui/UxBox';

import './styles.scss';

class About extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className={cx('about', this.props.className)}>
                <Row className={cx('about__title')}>
                    <h1>Generation up</h1>
                </Row>
                <Column className={cx('about__desc')} ai="flex-start">
                    <p>Моделирование генетических алгоритмов на примере игровой арены из 4 персонажей с постоянно усиливающимися
                        волнами противников.</p>
                    <p>Если выживает несколько копий одного поколения, одна из них мутирует по выбранному набору параметров в пределах заданного диапазона значений.</p>
                    <p>В случае удачной мутации поколение выживает дольше предыдущего, формируя все более жизнеспособные
                        комбинации навыков, специализаций и стратегий поведения.</p>
                    <p>Это позволяет итерационно сформировать адекватый искусственный интеллект с минимальным участием человека.</p>
                    <p>Кроме того инструмент годится для оттачивания баланса любых аспектов игровой механики.</p>
                </Column>
            </div>
        );
    }
}

About.propTypes = {
    className: PropTypes.string,
};

About.defaultProps = {
    className: '',
};

export default About;
