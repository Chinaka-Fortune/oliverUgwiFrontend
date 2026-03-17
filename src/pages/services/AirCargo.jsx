import ServiceLayout from './ServiceLayout';
import SEO from '../../components/SEO';

const AirCargo = () => {
    const features = [
        "Airfreight Forwarding",
        "Cargo Handling",
        "Customs Clearance",
        "Airport Services",
        "Logistics Solutions"
    ];

    return (
        <>
            <SEO
                title="Air Cargo & Freight Forwarding Services Nigeria"
                description="Professional air cargo logistics and international air freight forwarding in Lagos, Nigeria. Fast and reliable airport cargo handling and express delivery."
                keywords="Air freight services Nigeria, Air cargo logistics Lagos, Air freight forwarding Nigeria, International air cargo services, Airport cargo handling Nigeria"
            />
            <ServiceLayout
                title="Air Cargo Logistics"
                bgClass="air-bg"
                description="Swift, secure, and reliable airfreight forwarding for your most time-sensitive global shipments."
                overview="When speed is the priority, OLIVER-UGWI's Air Cargo Logistics delivers. We understand that time-critical freight requires extreme precision and constant oversight. Our integrated air logistics solutions connect all major global airports, providing you with flexible capacity, competitive rates, and priority handling for both standard and specialized shipments."
                features={features}
            >
                <h3>Why Choose Air Freight?</h3>
                <div className="row mt-4">
                    <div className="col-md-6 mb-4">
                        <div className="glass-card p-4 h-100">
                            <h4 className="text-secondary-blue">Unmatched Speed</h4>
                            <p className="mt-2 text-muted">The absolute fastest transport method available for long-distance and international shipping, minimizing inventory hold times.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="glass-card p-4 h-100">
                            <h4 className="text-secondary-blue">High Security</h4>
                            <p className="mt-2 text-muted">Rigorous airport controls and strict regulations reduce the risk of theft and damage to near zero.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="glass-card p-4 h-100">
                            <h4 className="text-secondary-blue">Global Reach</h4>
                            <p className="mt-2 text-muted">Ability to reach virtually any location worldwide within days, operating independent of coastal infrastructure.</p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="glass-card p-4 h-100">
                            <h4 className="text-secondary-blue">Lower Insurance</h4>
                            <p className="mt-2 text-muted">Faster transit times and tighter security protocols often result in lowered insurance premiums for air cargo.</p>
                        </div>
                    </div>
                </div>
            </ServiceLayout>
        </>
    );
};

export default AirCargo;
