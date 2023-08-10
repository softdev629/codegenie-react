import {
  Container,
  Box,
  Typography,
  Button,
  SvgIcon,
  Stack,
  Avatar,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { ReactComponent as HeroGrad } from "../assets/back_herograd.svg";
import { ReactComponent as HeroIconsBack } from "../assets/back_heroicons.svg";
import { ReactComponent as LeftArrowIcon } from "../assets/ico_leftarrow.svg";
import { ReactComponent as GraphicBack } from "../assets/back_graphics.svg";
import { ReactComponent as ToolIcon } from "../assets/ico_tool.svg";
import { ReactComponent as ValueIcon } from "../assets/ico_value.svg";
import { ReactComponent as BugFreeIcon } from "../assets/ico_bugfree.svg";
import { ReactComponent as BugFixIcon } from "../assets/ico_bug.svg";
import { ReactComponent as EyeIcon } from "../assets/ico_eye.svg";
import { ReactComponent as RefactorIcon } from "../assets/ico_refactor.svg";
import { ReactComponent as TestCaseIcon } from "../assets/ico_testcase.svg";
import { ReactComponent as SuggestIcon } from "../assets/ico_suggest.svg";
import { ReactComponent as MonolithicIcon } from "../assets/ico_monolithic.svg";
import { ReactComponent as DocumentIcon } from "../assets/ico_document.svg";
import { ReactComponent as ReviewIcon } from "../assets/ico_review.svg";
import { ReactComponent as RewriteIcon } from "../assets/ico_rewrite.svg";
import { ReactComponent as PlayIcon } from "../assets/ico_play.svg";

import Avatar01 from "../assets/avatar_01.svg";
import HeroGenie from "../assets/back_genie.png";
import PeopleSoftLogo from "../assets/logo_peoplesoft.png";
import OracleLogo from "../assets/logo_oracle.png";
import CorningLogo from "../assets/logo_corning.png";
import NevadaLogo from "../assets/logo_nevada.png";
import HPLogo from "../assets/logo_hp.png";
import Section2Back from "../assets/back_section2.png";
import VideoBack from "../assets/back_video.png";
import BackProduct1 from "../assets/back_product_1.png";
import BackProduct2 from "../assets/back_product_2.png";
import BackProduct3 from "../assets/back_product_3.png";
import BackProduct4 from "../assets/back_product_4.png";
import FAQItem from "../components/FAQItem";
import LandingHeader from "../components/headers/LandingHeader";
import { useAppSelector } from "../redux/store";

const genie_product = [
  {
    type: "BENEFITS",
    title: "Audit and Refactor Blockchain Smart Contracts",
    content:
      "Code Genie your indispensable tool for auditing and optimizing blockchain smart contracts. With a deep understanding of Solidity and Ethereum's ecosystem, it identifies security flaws and potential improvements. Through automated code reviews and best practices, it ensures high standards of security and efficiency.",
    src: BackProduct1,
  },
  {
    type: "BENEFITS",
    title: "Convert Monolithic Code to Microservices",
    content:
      "Code Genie excels at converting monolithic code into scalable microservices. It analyzes the codebase, identifies microservices opportunities, and provides refactoring guidelines. This empowers companies to leverage microservices' benefits: improved scalability, flexibility, and easy future enhancements.",
    src: BackProduct2,
  },
  {
    type: "BENEFITS",
    title: "Complete and Detailed API Documentation",
    content:
      "Code Genie your invaluable resource for automated API documentation. It extracts API endpoints, request/response structures, and auth mechanisms from the codebase, generating clear docs with examples, parameters, and error handling. Developers save time and effort, ensuring accurate and up-to-date.",
    src: BackProduct3,
  },
  {
    type: "BENEFITS",
    title: "Transform Legacy Code & DB SQL to Cloud DB & Architecture",
    content:
      "Code Genie is an exceptional ally for modernizing legacy codebases and transitioning to cloud-based solutions. It deeply understands programming languages and databases, analyzing and identifying areas for improvement and migration. It generates refactoring recommendations, suggesting cloud-native.",
    src: BackProduct4,
  },
];

const faqs = [
  {
    title: "What is Code Genie?",
    content:
      "Code Genie is a versatile tool that supports a wide range of modern programming languages. It can analyze, fix, rewrite, and assist with code in almost any language. Its language-agnostic nature allows developers and companies to leverage its capabilities regardless of the technology stack they are working with.",
  },
  {
    title: "What programming languages does Code Genie support?",
    content:
      "Code Genie supports a wide range of programming languages, from popular ones like Python, JavaScript, and Java to specialized languages like Solidity for smart contract development. Its language-agnostic nature means it can work with practically any programming language, including PHP, Node.js, Angular, and more.",
  },
  {
    title: "What are the benefits of using Code Genie for developers?",
    content:
      "The value to developers lies in the increased productivity, reduced manual effort, and time savings of potentially hours or days of work per week. This enables them to focus on critical aspects of development.",
  },
  {
    title:
      "How can Code Genie help companies optimize their development processes?",
    content:
      "By using Code Genie, companies can optimize their development processes, increase their development team's efficiency, and deliver high-quality, bug-free software products in a timely manner.",
  },
  {
    title: "What tasks can Code Genie perform?",
    content:
      "Code Genie can audit, fix, refactor, document any code within seconds. It can also create test cases, provide non-techie code summaries, create feature suggestions, offer detailed code reviews, convert monolithic code to microservices, and rewrite code.",
  },
  {
    title: "Who can benefit from using Code Genie?",
    content:
      "Code Genie is beneficial for CTOs, Engineering Managers, QA, Product Managers, and developers. It helps solve common problems faced by these professionals daily, such as bug fixing, code documentation, code refactoring, and converting old code to microservices.",
  },
  {
    title: "Does Code Genie write code from scratch or replace developers?",
    content:
      "No, Code Genie does not write code from scratch and is not trying to replace developers. It is focused on helping and augmenting the development team’s efforts to ship more stable, bug-free products on time and frequently.",
  },
  {
    title: "How does Code Genie help with blockchain smart contracts?",
    content:
      "Code Genie is an indispensable tool for auditing and optimizing blockchain smart contracts. With a deep understanding of Solidity and Ethereum's ecosystem, it identifies security flaws and potential improvements. Through automated code reviews and best practices, it ensures high standards of security and efficiency.",
  },
  {
    title: "Can Code Genie convert monolithic code to microservices?",
    content:
      "Yes, Code Genie excels at converting monolithic code into scalable microservices. It analyzes the codebase, identifies microservices opportunities, and provides refactoring guidelines.",
  },
  {
    title: "How does Code Genie assist with API documentation?",
    content:
      "Code Genie is an invaluable resource for automated API documentation. It extracts API endpoints, request/response structures, and auth mechanisms from the codebase, generating clear docs with examples, parameters, and error handling. This saves developers time and effort, ensuring accurate and up-to-date documentation.",
  },
];

const landingTexts = {
  "All Code": {
    heroTitle: "Code Genie AI can Audit, Fix, Refactor, Document any Code ",
    heroContent:
      "Code Genie can analyze, fix, rewrite and assist with code in almost any language. Its Programming language-agnostic nature allows developers and companies to leverage its capabilities regardless of the technology stack they are working with.",
    efficiency: [
      {
        icon: <ToolIcon />,
        title: "Versatile Tool",
        content:
          "Code Genie AI is a versatile tool for modern programming languages and frameworks.  It is language-agnostic and can work with practically any programming languages including PHP, Python, Node.js, Solidity, Angular or any other tech stack.  Use Code Genie to analyze, fix, debug, refactor, rewrite any code within seconds. ",
      },
      {
        icon: <ValueIcon />,
        title: "The Value",
        content:
          "The value to developers lies in the increased productivity, reduced manual effort, time savings of potentially hours or days of work per week, enabling them to focus on critical aspects of development.",
      },
      {
        icon: <BugFreeIcon />,
        title: "Bug-free Development",
        content:
          "Ultimately, by using Code Genie, companies can optimize their development processes, increase their development team's efficiency, and deliver high-quality bug-free software products in a timely manner.",
      },
    ],
    functionality: {
      title:
        "Code Genie AI can Fix Any Code and make your Development Team more efficient",
      items1: [
        { icon: <BugFixIcon />, text: "Bug Fix Any Code" },
        { icon: <TestCaseIcon />, text: "Create Test Cases" },
        { icon: <DocumentIcon />, text: "Create Code Documentation" },
      ],
      items2: [
        { icon: <EyeIcon />, text: "Non-Techie Code Summary" },
        { icon: <SuggestIcon />, text: "Create Feature Suggestions" },
        { icon: <ReviewIcon />, text: "Create Detailed Code Review" },
      ],
      items3: [
        { icon: <RefactorIcon />, text: "Code Refactor" },
        {
          icon: <MonolithicIcon />,
          text: "Convert Monolithic Code to Micro Services",
        },
        { icon: <RewriteIcon />, text: "Code Rewrite" },
      ],
    },
    extra_title: "Audit, Fix, Refactor, Document any Code Now",
  },
  "SMART CONTRACTS": {
    heroTitle: "Code Genie Can Do Detailed Audits and Fix Smart Contracts ",
    heroContent:
      "Code Genie can audit and fix virtually any smart contract within seconds. Code Genie works on smart contracts from a variety of blockchain networks.  Smart Contract audits include Security Audit, Functional Audit, Compliance Audit, Tokenomics Audit and more.  If Code Genie finds a problem with the Contract it can Fix the Contract as well.",
    efficiency: [
      {
        icon: <ToolIcon />,
        title: "Auditing Tool",
        content:
          "Code Genie AI is a versatile tool designed to audit and fix issues with blockchain smart contracts.   It is language-agnostic and can work with practically any smart contract.   Use Code Genie to audit, debug, and fix smart contracts within seconds.",
      },
      {
        icon: <ValueIcon />,
        title: "The Value",
        content:
          "The value to developers lies in the increased productivity, reduced manual effort, time savings of potentially hours or days of work per week, enabling them to focus on critical aspects of development.",
      },
      {
        icon: <BugFreeIcon />,
        title: "Bug-free Development",
        content:
          "Ultimately, by using Code Genie, companies can feel more confident about their deployed contracts.  Code Genie helps to identify vulnerabilities in smart contracts and help developers to resolve the issues.  Code Genie therefore can help to optimize the company's development processes, increase its development team's efficiency, and deliver high-quality bug-free software products in a timely manner.",
      },
    ],
    functionality: {
      title:
        "Code Genie AI can Audit and Fix Smart Contracts and make your Development Team more efficient",
      items1: [
        { icon: <BugFixIcon />, text: "Summarize Smart Contracts" },
        { icon: <TestCaseIcon />, text: "Compliance Audit" },
        { icon: <DocumentIcon />, text: "Gas Optimization" },
      ],
      items2: [
        { icon: <EyeIcon />, text: "Security Audit" },
        { icon: <SuggestIcon />, text: "Gas Audit" },
        { icon: <ReviewIcon />, text: "Code Fix" },
      ],
      items3: [
        {
          icon: <RefactorIcon />,
          text: "Code Review",
        },
        { icon: <MonolithicIcon />, text: "Tokenomics Audit" },
        { icon: <RewriteIcon />, text: "Formal Verification" },
      ],
    },
    extra_title: "Audit, Fix, Verify, Document Smart Contracts Now",
  },
};

const LandingPage = () => {
  const genieSelector = useAppSelector((state) => state.genieState);
  let module_name = genieSelector.module;

  const navigate = useNavigate();

  return (
    <>
      <LandingHeader />
      {module_name && module_name.length >= 1 && (
        <>
          <Box position="relative">
            <Container>
              <Typography
                sx={{ width: 500 }}
                fontWeight="700"
                lineHeight="60px"
                color="text.secondary"
                letterSpacing="-1.2px"
                variant="h3"
                paddingTop={12}
              >
                {
                  landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].heroTitle
                }
                <Box
                  component="span"
                  sx={{
                    background:
                      "-webkit-linear-gradient(112deg, #0168B5 0%, #4BA5EB 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Within Seconds
                </Box>
              </Typography>
              <Typography width={500} marginTop={1} fontSize={18}>
                {
                  landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].heroContent
                }
              </Typography>
              <Button
                sx={{
                  background:
                    "linear-gradient(270deg, #4BA5EB 0%, #0168B5 100%)",
                  color: "white",
                  paddingX: "20px",
                  paddingY: "12px",
                  borderRadius: "4px",
                  width: "300px",
                  marginTop: 4,
                }}
                endIcon={
                  <SvgIcon>
                    <LeftArrowIcon />
                  </SvgIcon>
                }
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Get started for free
              </Button>
              <Stack gap={1} width="fit-content" marginTop={10}>
                <Typography
                  fontSize={18}
                  color="text.secondary"
                  fontWeight={600}
                  letterSpacing={-0.45}
                >
                  “Impressive.  Very Impressive!”
                </Typography>
                <Stack flexDirection="row" gap={1}>
                  <Avatar src={Avatar01} />
                  <Stack gap={0.5}>
                    <Typography
                      color="text.secondary"
                      fontWeight={500}
                      fontSize={16}
                    >
                      Saravanan B.
                    </Typography>
                    <Typography fontSize={14}>Engineering Manager</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Container>
            <Box position="absolute" top={0} right={0}>
              <HeroGrad />
            </Box>
            <Box position="absolute" right={50} top={73}>
              <img src={HeroGenie} alt="Genie" />
            </Box>
            <Box position="absolute" right={72} top={116}>
              <HeroIconsBack />
            </Box>
          </Box>
          <Stack
            padding="50px 214px"
            gap="56px"
            alignItems="center"
            marginTop={15}
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paper,
            })}
          >
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "56px",
                justifyContent: "space-between",
              }}
            >
              <img src={PeopleSoftLogo} height={38} alt="PeopleSoft" />
              <img src={OracleLogo} height={32} alt="Oracle" />
              <img src={CorningLogo} height={28} alt="Corning" />
              <img src={NevadaLogo} height={76} alt="Nevada" />
              <img src={HPLogo} height={52} alt="HP" />
            </Container>
          </Stack>
          <Box position="relative">
            <Container sx={{ pt: 12, pb: 10 }}>
              <Stack width={572}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="text.secondary"
                  mb={7}
                >
                  Empowering Developers and Companies
                </Typography>

                <Stack gap={4}>
                  {landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].efficiency.map((item, index) => (
                    <Box key={`efficiency_item_${index}`}>
                      <Box
                        sx={{
                          height: "1px",
                          background:
                            "linear-gradient(45deg, #4BA5EB 0%, rgba(75, 165, 235, 0.00) 100%);",
                        }}
                        mb={4}
                      ></Box>
                      <Box>
                        <Stack flexDirection="row">
                          <Box
                            width={44}
                            height={44}
                            sx={{ backgroundColor: "primary.main" }}
                            borderRadius={1}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                          >
                            {item.icon}
                          </Box>
                          <Typography
                            variant="h4"
                            fontWeight={500}
                            color="primary.main"
                            ml={2}
                          >
                            {item.title}
                          </Typography>
                        </Stack>
                        <Typography mt={2} fontSize={18}>
                          {item.content}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Stack>
            </Container>
            <Box position="absolute" top={0} right={0}>
              <GraphicBack />
            </Box>
            <Box position="absolute" top={184} right={40}>
              <img src={Section2Back} alt="Circles" />
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              background: `linear-gradient(137deg, ${theme.palette.background.default} 0%, rgba(229, 244, 255, 0.14) 100%)`,
            })}
            py={12}
          >
            <Container>
              <Stack alignItems="center" gap={7}>
                <Typography
                  color="text.secondary"
                  variant="h4"
                  width={680}
                  textAlign="center"
                  fontWeight={700}
                >
                  {
                    landingTexts[
                      module_name === "All Code"
                        ? "All Code"
                        : "SMART CONTRACTS"
                    ].functionality.title
                  }
                </Typography>
              </Stack>
              <Stack flexDirection="row" justifyContent="space-between" mt={7}>
                <Stack gap={10} width={350}>
                  {landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].functionality.items1.map((item, index) => (
                    <Stack
                      flexDirection="row"
                      gap={2}
                      alignItems="center"
                      key={`item1_${index}`}
                    >
                      <Box
                        border="1px solid"
                        borderColor="primary.main"
                        sx={{ background: "#DFEFFF" }}
                        width={60}
                        height={60}
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="h5">{item.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack gap={10} flexGrow={1}>
                  {landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].functionality.items2.map((item, index) => (
                    <Stack
                      flexDirection="row"
                      gap={2}
                      alignItems="center"
                      key={`item2_${index}`}
                    >
                      <Box
                        border="1px solid"
                        borderColor="primary.main"
                        sx={{ background: "#DFEFFF" }}
                        width={60}
                        height={60}
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="h5">{item.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Stack gap={10} flexGrow={1}>
                  {landingTexts[
                    module_name === "All Code" ? "All Code" : "SMART CONTRACTS"
                  ].functionality.items3.map((item, index) => (
                    <Stack
                      flexDirection="row"
                      gap={2}
                      alignItems="center"
                      key={`item3_${index}`}
                    >
                      <Box
                        border="1px solid"
                        borderColor="primary.main"
                        sx={{ background: "#DFEFFF" }}
                        width={60}
                        height={60}
                        borderRadius="50%"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {item.icon}
                      </Box>
                      <Typography variant="h5">{item.text}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Box>
          <Box
            sx={{
              background:
                "linear-gradient(136deg, rgba(75, 165, 235, 0.24) 0%, rgba(216, 77, 77, 0.24) 42.71%, rgba(223, 211, 255, 0.24) 70.31%, rgba(75, 165, 235, 0.24) 100%)",
            }}
          >
            <Container>
              <Stack
                flexDirection="row"
                justifyContent="space-between"
                py={12}
                alignItems="center"
              >
                <Typography
                  color="text.secondary"
                  width={564}
                  variant="h4"
                  fontWeight={700}
                >
                  Audit, Fix, Refactor, Document any Code Now
                </Typography>
                <Button
                  sx={{
                    background:
                      "linear-gradient(270deg, #4BA5EB 0%, #0168B5 100%)",
                    color: "white",
                    paddingX: "20px",
                    paddingY: "12px",
                    borderRadius: "4px",
                    width: "300px",
                    marginTop: 4,
                  }}
                  endIcon={
                    <SvgIcon>
                      <LeftArrowIcon />
                    </SvgIcon>
                  }
                >
                  Get started for free
                </Button>
              </Stack>
            </Container>
          </Box>
          <Box>
            <Container sx={{ py: 12 }}>
              <Stack flexDirection="row" gap={12}>
                <Box width={480}>
                  <Typography
                    color="text.secondary"
                    variant="h4"
                    fontWeight={600}
                    mb={2}
                  >
                    Meet Code Genie, The Developer’s Friend
                  </Typography>
                  <Typography width={450} fontSize={18}>
                    Code Genie was made by developers to help solve common
                    problems faced by developers daily. There is nothing more
                    frustrating than bug fixing. Code documentation of existing
                    systems can also be a challenge. Code refactoring to address
                    code debt is also a challenge. Converting old code to
                    microservices is also very challenging. These are daily
                    challenges we face as developers.
                    <br />
                    <br />
                    CTOs, Engineering Managers, QA, Product Managers face
                    constant issues with code review, understanding code logic,
                    and communication about code complexity with developers.
                    <br />
                    <br />
                    Code Genie was built from the trenches to help solve these
                    and other problems faced with development and cross
                    functional teams.
                    <br />
                    <br />
                    Code Genie does NOT write code from scratch and is NOT
                    trying to replace developers. We are focused on helping and
                    augmenting the development team’s efforts to ship more
                    stable, bug free products on time and frequently.
                    <br />
                    <br />
                    Thank you for using our product
                    <br />
                    <br />
                    <Box component="span" fontWeight={700}>
                      Rohan Hall, CEO
                      <br />
                      OceSha.com
                    </Box>
                  </Typography>
                </Box>
                <Box
                  flexGrow={1}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <Typography
                    color="primary.main"
                    textAlign="center"
                    mb={3}
                    fontWeight={700}
                  >
                    HOW IT WORKS
                  </Typography>
                  <Box
                    sx={{ backgroundImage: `url(${VideoBack})` }}
                    height={443}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <PlayIcon />
                  </Box>
                </Box>
              </Stack>
            </Container>
          </Box>
          <Box
            sx={(theme) => ({
              backgroundColor:
                theme.palette.mode === "light" ? "#F5F5F5" : "#242936",
              py: 16,
            })}
          >
            <Container maxWidth="xl">
              <Typography
                textAlign="center"
                variant="h3"
                sx={{
                  background:
                    "-webkit-linear-gradient(139deg, #036AB7 0%, #49A4EA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  letterSpacing: "-0.8px",
                  fontWeight: "bold",
                }}
                mb={12}
              >
                Code Genie Products
              </Typography>
              <Stack gap={25}>
                {genie_product.map((item, index) => (
                  <Box display="flex" key={`product_item_${index}`}>
                    <Stack
                      flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
                      gap={16}
                      alignItems="center"
                    >
                      <Box width={560}>
                        <img src={item.src} alt={`Product ${item.title}`} />
                      </Box>
                      <Box flexGrow={1}>
                        <Typography color="primary.main" variant="h4" mb={1}>
                          {item.type}
                        </Typography>
                        <Stack gap={4}>
                          <Typography
                            variant="h4"
                            color="text.secondary"
                            fontWeight={700}
                          >
                            {item.title}
                          </Typography>
                          <Typography fontSize={18}>{item.content}</Typography>
                          <Typography
                            fontSize={28}
                            color="primary.main"
                            display="flex"
                            alignItems="center"
                            gap={1.5}
                          >
                            Learn more <ArrowForward />
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Container>
          </Box>
          <Box
            sx={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(75, 165, 235, 0.00) 0%, #4BA5EB 50.52%, rgba(75, 165, 235, 0.00) 100%)",
            }}
          ></Box>
          <Box sx={{ py: 16 }}>
            <Container maxWidth="xl">
              <Stack flexDirection="row" gap={10}>
                <Stack justifyContent="space-between">
                  <Typography
                    width={420}
                    color="text.secondary"
                    fontWeight={700}
                    fontSize="32px"
                    letterSpacing={-0.8}
                  >
                    Frequently Asked Questions
                  </Typography>
                  <Typography width={316}>
                    Couldn't find what you are looking for? Write to us at :
                    mail@codegenie.com
                  </Typography>
                </Stack>
                <Stack flexGrow={1}>
                  {faqs.map((faq, index) => (
                    <FAQItem
                      title={faq.title}
                      content={faq.content}
                      key={`faq_item_${index}`}
                    />
                  ))}
                </Stack>
              </Stack>
            </Container>
          </Box>
        </>
      )}
    </>
  );
};

export default LandingPage;
