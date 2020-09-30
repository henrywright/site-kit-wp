/**
 * Analytics Main setup component.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
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
import { useEffect, useState } from '@wordpress/element';
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import AnalyticsIcon from '../../../../../svg/analytics.svg';
import SetupForm from './SetupForm';
import ProgressBar from '../../../../components/progress-bar';
import { trackEvent } from '../../../../util';
import { STORE_NAME, ACCOUNT_CREATE } from '../../datastore/constants';
import { STORE_NAME as CORE_SITE } from '../../../../googlesitekit/datastore/site/constants';
import {
	AccountCreate,
	AccountCreateLegacy,
	ExistingTagError,
} from '../common';
const { useSelect, useDispatch } = Data;

export default function SetupMain( { finishSetup } ) {
	const accounts = useSelect( ( select ) => select( STORE_NAME ).getAccounts() );
	const accountID = useSelect( ( select ) => select( STORE_NAME ).getAccountID() );
	const existingTag = useSelect( ( select ) => select( STORE_NAME ).getExistingTag() ) || {};
	const hasExistingTag = useSelect( ( select ) => select( STORE_NAME ).hasExistingTag() );
	const hasExistingTagPermission = useSelect( ( select ) => select( STORE_NAME ).hasExistingTagPermission() );
	const existingTagPermission = useSelect( ( select ) => select( STORE_NAME ).getTagPermission( existingTag ) );
	const isDoingGetAccounts = useSelect( ( select ) => select( STORE_NAME ).isDoingGetAccounts() );
	const isDoingSubmitChanges = useSelect( ( select ) => select( STORE_NAME ).isDoingSubmitChanges() );
	const hasResolvedAccounts = useSelect( ( select ) => select( STORE_NAME ).hasFinishedResolution( 'getAccounts' ) );
	const isCreateAccount = ACCOUNT_CREATE === accountID;
	const usingProxy = useSelect( ( select ) => select( CORE_SITE ).isUsingProxy() );

	// Set the accountID and property if there is an existing tag.
	const { setAccountID, selectProperty } = useDispatch( STORE_NAME );
	useEffect( () => {
		if ( hasExistingTag && existingTagPermission ) {
			const { accountID: existingTagAccountID } = existingTagPermission;
			setAccountID( existingTagAccountID );
			selectProperty( existingTag );
		}
	}, [ hasExistingTag, existingTag, existingTagPermission ] );

	// When `finishSetup` is called, flag that we are navigating to keep the progress bar going.
	const [ isNavigating, setIsNavigating ] = useState( false );
	const finishSetupAndNavigate = ( ...args ) => {
		finishSetup( ...args );
		setIsNavigating( true );
	};

	useEffect( () => {
		trackEvent( 'analytics_setup', 'configure_analytics_screen' );
	}, [] );

	let viewComponent;
	// Here we also check for `hasResolvedAccounts` to prevent showing a different case below
	// when the component initially loads and has yet to start fetching accounts.
	if ( isDoingGetAccounts || isDoingSubmitChanges || ! hasResolvedAccounts || isNavigating ) {
		viewComponent = <ProgressBar />;
	} else if ( hasExistingTag && hasExistingTagPermission === false ) {
		viewComponent = <ExistingTagError />;
	} else if ( isCreateAccount || ( Array.isArray( accounts ) && ! accounts.length ) ) {
		viewComponent = usingProxy ? <AccountCreate /> : <AccountCreateLegacy />;
	} else {
		viewComponent = <SetupForm finishSetup={ finishSetupAndNavigate } />;
	}

	return (
		<div className="googlesitekit-setup-module googlesitekit-setup-module--analytics">

			<div className="googlesitekit-setup-module__logo">
				<AnalyticsIcon width="33" height="33" />
			</div>

			<h2 className="googlesitekit-heading-3 googlesitekit-setup-module__title">
				{ _x( 'Analytics', 'Service name', 'google-site-kit' ) }
			</h2>

			{ viewComponent }
		</div>
	);
}

SetupMain.propTypes = {
	finishSetup: PropTypes.func,
};

SetupMain.defaultProps = {
	finishSetup: () => {},
};
