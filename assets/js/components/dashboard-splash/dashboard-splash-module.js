/**
 * DashboardSplashModule component.
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

function DashboardSplashModule( { icon, title, content } ) {
	return (
		<div className="googlesitekit-splash-module">
			<div className="googlesitekit-splash-module__logo">
				{ icon }
			</div>
			<h3 className="
				googlesitekit-subheading-1
				googlesitekit-splash-module__title
			">
				{ title }
			</h3>
			<p className="googlesitekit-splash-module__text">
				{ content }
			</p>
		</div>
	);
}

DashboardSplashModule.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.string,
	content: PropTypes.string,
};

DashboardSplashModule.defaultProps = {
	icon: '',
	title: '',
	content: '',
};

export default DashboardSplashModule;
