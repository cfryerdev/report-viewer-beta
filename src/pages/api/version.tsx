import Layout from "../../layout";
import pkg from "../../../package.json";

const HealthPage = () => {
  return (
    <Layout>
      <div className="text-center">
        Version: {pkg.version}
      </div>
    </Layout>
  )
}

export default HealthPage;