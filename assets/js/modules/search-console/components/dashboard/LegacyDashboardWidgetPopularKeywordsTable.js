/**
 * LegacyDashboardWidgetPopularKeywordsTable component.
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
import { __, _x } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { getTimeInSeconds, numberFormat } from '../../../../util';
import withData from '../../../../components/higherorder/withdata';
import { TYPE_MODULES } from '../../../../components/data';
import { getDataTableFromData, TableOverflowContainer } from '../../../../components/data-table';
import PreviewTable from '../../../../components/preview-table';
import Layout from '../../../../components/layout/layout';
import {
	isDataZeroSearchConsole,
} from '../../util';
import { STORE_NAME } from '../../datastore/constants';
const { useSelect } = Data;

const LegacyDashboardWidgetPopularKeywordsTable = ( props ) => {
	const { data } = props;
	const domain = useSelect( ( select ) => select( STORE_NAME ).getPropertyID() );
	const baseServiceURL = useSelect( ( select ) => select( STORE_NAME ).getServiceURL( { path: '/performance/search-analytics', query: { resource_id: domain, num_of_days: 28 } } ) );
	const searchConsolePropertyMainURL = useSelect( ( select ) => select( STORE_NAME ).getServiceURL( { query: { resource_id: domain } } ) );

	if ( ! data || ! data.length ) {
		return null;
	}

	const headers = [
		{
			title: __( 'Top search queries for your site', 'google-site-kit' ),
			tooltip: __( 'Most searched for keywords related to your content', 'google-site-kit' ),
			primary: true,
		},
		{
			title: __( 'Clicks', 'google-site-kit' ),
			tooltip: __( 'Number of times users clicked on your content in search results', 'google-site-kit' ),
		},
		{
			title: __( 'Impressions', 'google-site-kit' ),
			tooltip: __( 'Counted each time your content appears in search results', 'google-site-kit' ),
		},
	];
	const links = [];

	const dataMapped = data.map( ( row, i ) => {
		const query = row.keys[ 0 ];
		links[ i ] = addQueryArgs( baseServiceURL, { query: `!${ query }` } );
		return [
			query,
			numberFormat( row.clicks ),
			numberFormat( row.impressions ),
		];
	} );

	const options = {
		hideHeader: false,
		chartsEnabled: false,
		links,
	};

	const dataTable = getDataTableFromData( dataMapped, headers, options );

	return (
		<div className="
				mdc-layout-grid__cell
				mdc-layout-grid__cell--span-6-desktop
				mdc-layout-grid__cell--span-4-tablet
			">
			<Layout
				className="googlesitekit-popular-content"
				footer
				footerCtaLabel={ _x( 'Search Console', 'Service name', 'google-site-kit' ) }
				footerCtaLink={ searchConsolePropertyMainURL }
				fill
			>
				<TableOverflowContainer>
					{ dataTable }
				</TableOverflowContainer>
			</Layout>
		</div>
	);
};

export default withData(
	LegacyDashboardWidgetPopularKeywordsTable,
	[
		{
			type: TYPE_MODULES,
			identifier: 'search-console',
			datapoint: 'searchanalytics',
			data: {
				dimensions: 'query',
				limit: 10,
			},
			priority: 1,
			maxAge: getTimeInSeconds( 'day' ),
			context: [ 'Dashboard' ],
		},
	],
	<div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet">
		<Layout className="googlesitekit-popular-content" fill>
			<PreviewTable padding />
		</Layout>
	</div>,
	{
		inGrid: true,
		createGrid: true,
	},
	isDataZeroSearchConsole
);
