/**
 * DashboardSplashOutro component.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import GoogleLogoIcon from '../../../svg/logo-g.svg';
import Button from '../button';

class DashboardSplashOutro extends Component {
	render() {
		const {
			description = __( 'Bringing the best of Google tools to WordPress.', 'google-site-kit' ),
			buttonLabel,
			onButtonClick,
		} = this.props;

		return (
			<section className="googlesitekit-splash-outro">
				<div className="mdc-layout-grid">
					<div className="mdc-layout-grid__inner">
						<div className="
							mdc-layout-grid__cell
							mdc-layout-grid__cell--span-12
						">
							<div className="googlesitekit-splash-outro__logo">
								<GoogleLogoIcon height="33" width="29" />
							</div>
							<h3 className="
								googlesitekit-heading-2
								googlesitekit-splash-outro__title
							">
								{ description }
							</h3>
							{ buttonLabel && onButtonClick &&
								<div className="googlesitekit-splash-outro__button">
									<Button onClick={ onButtonClick }>
										{ buttonLabel }
									</Button>
								</div>
							}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

DashboardSplashOutro.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	buttonLabel: PropTypes.string,
	onButtonClick: PropTypes.func,
};

DashboardSplashOutro.defaultProps = {
};

export default DashboardSplashOutro;
