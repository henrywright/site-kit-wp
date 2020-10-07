/**
 * Notification initialization.
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
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { createAddToFilter } from '../../util/helpers';
import { getQueryParameter } from '../../util';
import DashboardCoreSiteAlerts from './dashboard-core-site-alerts';
import DashboardSetupAlerts from './dashboard-setup-alerts';
import DashboardModulesAlerts from './dashboard-modules-alerts';
import DashboardWinsAlerts from './dashboard-wins-alerts';
import DashboardAuthScopesAlert from './DashboardAuthScopesAlert';

const { setup } = global._googlesitekitLegacyData;
const notification = getQueryParameter( 'notification' );

const addCoreSiteNotifications = createAddToFilter( <DashboardCoreSiteAlerts /> );
const addSetupNotifications = createAddToFilter( <DashboardSetupAlerts /> );
const addModulesNotifications = createAddToFilter( <DashboardModulesAlerts /> );
const addWinsNotifications = createAddToFilter( <DashboardWinsAlerts /> );
const addAuthNotification = createAddToFilter( <DashboardAuthScopesAlert /> );

addFilter( 'googlesitekit.DashboardNotifications',
	'googlesitekit.SetupNotification',
	addCoreSiteNotifications, 10 );

if ( setup.needReauthenticate ) {
	addFilter( 'googlesitekit.ErrorNotification',
		'googlesitekit.AuthNotification',
		addAuthNotification, 1 );
}

if ( 'authentication_success' === notification || 'authentication_failure' === notification ) {
	addFilter( 'googlesitekit.DashboardNotifications',
		'googlesitekit.SetupNotification',
		addSetupNotifications, 1 );
} else if ( setup.isAuthenticated && setup.isVerified ) {
	addFilter( 'googlesitekit.DashboardNotifications',
		'googlesitekit.ModulesNotification',
		addModulesNotifications, 1 );

	addFilter( 'googlesitekit.DashboardNotifications',
		'googlesitekit.WinsNotification',
		addWinsNotifications, 1 );
}
