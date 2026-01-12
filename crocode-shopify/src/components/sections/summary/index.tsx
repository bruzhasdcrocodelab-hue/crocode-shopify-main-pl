import styles from './styles.module.scss'

import { Text } from '@/components/ui'
import { TBrief } from '@/types/templates/project'
import Link from 'next/link'

type TProps = {
	title: string;
	brief: TBrief;
}

const Summary = ({title, brief}: TProps) => {
	const details = [
		{
			title: 'Industry',
			answer: brief?.industry,
		},
		{
			title: 'Project',
			answer: title,
		},
		{
			title: 'Technology',
			answer: brief?.technologies,
		},
		{
			title: 'Website',
			answer: brief?.website,
		},
	]

	interface DetailItemProps {
		title: string;
		value: string | string[];
		type?: 'text' | 'list' | 'link';
		linkUrl?: string;
		linkText?: string;
	}

	const DetailItem = ({ title, value, type = 'text', linkUrl, linkText }: DetailItemProps) => {
		const renderContent = () => {
			switch (type) {
				case 'list':
					return (
						<ul className={styles.summary__list}>
							{(value as string[]).map((item, index) => (
								<li key={index} className={styles.summary__listItem}>
									{item}
								</li>
							))}
						</ul>
					);
				case 'link':
					return (
						<Link href={linkUrl || (value as string)}>
							{linkText || (value as string)}
						</Link>
					);
				default:
					return <span>{value as string}</span>;
			}
		};

		return (
			<div className={styles.summary__detail_item}>
				<h3 className={styles.summary__detail_title}>{title}</h3>
				<div className={styles.summary__detail_answer}>
					{renderContent()}
				</div>
			</div>
		);
	};

  return (
		<section className={styles.summary}>
			<div className={styles.summary__inner}>
				<div className={styles.summary__description}>
					<Text className={styles.summary__title} tag='h2' text='The Brief' style='big'/>
					<p className={styles.summary__message}>{brief?.description}</p>
				</div>
				<div className={styles.summary__detail}>
					<DetailItem title="Industry" value={brief?.industry} />
					<DetailItem title="Project" value={title} />
					<DetailItem title="Technology" value={brief?.technologies} type="list" />
					<DetailItem title="Website" value={brief?.website.url} type="link" linkText={brief?.website.text}/>
				</div>
			</div>
		</section>
  )
}

export default Summary