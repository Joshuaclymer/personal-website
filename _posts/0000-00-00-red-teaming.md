---
layout: post
title: "Red teaming: challenges and research directions"
cover-img: /assets/img/turtles.png
thumbnail-img: ""
date: "9th May 2023"
---

This post is a follow-up to [Safety Standards: a framework for AI regulation](/posts/safety_standards). In the previous post, I claimed that competent red-teaming organizations will be essential for effective regulation. In this post, I describe promising research directions for AI red-teaming organizations to pursue. If you are mostly interested in the research directions, I recommend skipping to the end.

Background: goals of AI red teaming
Red teaming is a term used across industries to refer to the process of assessing the security, resilience, and effectiveness of systems by soliciting adversarial attacks to identify problems with them. The term "red team" originates from military exercises, where an independent group (the red team) would challenge an organization's existing defense strategies by adopting the perspective and tactics of potential adversaries.

In the context of AI, red teaming is the practice of finding evidence that an AI system has hazardous properties to inform decision-making and improve the system’s safety.

“Red teamers” may inform a number of **regulatory decisions** that are contingent on an AI system’s safety, for example:

- Should the AI system be made available to the public?
- Should the developer be allowed to release a more powerful system? It would be reasonable for regulators to prevent powerful AI systems from being deployed until the safety issues of the weaker ones are resolved.
- What licenses should users be required to obtain to access the system or different parts of the system?
- Should the uses or actions of the AI system be restricted? For example, should the system be allowed to spend large sums of money without approval from a human overseer? Should it be used to control weapons? 

Red teamers might directly work with regulators to inform these decisions. Several researchers and [organizations](https://futureoflife.org/wp-content/uploads/2023/04/FLI_Policymaking_In_The_Pause.pdf) have advocated for a national AI regulatory agency that functions like the FDA. The FDA sometimes holds advisory committee meetings where a new drug is essentially put on trial to determine whether it should move to the next stage of review. The drug's manufacturer and external experts present FDA representatives with arguments for and against the safety of the drug. AI systems may similarly be 'placed on trial.' Labs will likely play the part of the defendant, so red-teaming organizations must play the part of the prosecutor.

There are three categories of **hazards** red teamers might aim to identify to mitigate catastrophic risks:

- **Unauthorized access**. To guard against misuse, labs might require customers to obtain licenses to access capabilities related to cyber offense, weapons R&D, persuasion, etc. Eliciting these capabilities without the appropriate license would constitute “unauthorized access.”
- **Harmful or illicit use**. AI systems should not help humans accomplish illicit or clearly harmful goals.
- **Unintended propensities**. AI systems should not have goals or drives of their own.

# Preventing disallowed use
Preventing unauthorized access and preventing harmful or illicit use have the same basic structure. In both cases, the aim is to prevent adversaries from accomplishing specific tasks with an AI system.

The following are ways adversaries can interact with an AI system to assist them with a disallowed task:

- **Prompting / inputs**: it is common for adversaries to jailbreak OpenAI’s models, which involves finding a prompt that causes an AI system to deviate from the policies developers instructed or trained it to follow. An adversary may also prompt an AI system in a way that makes their goal unclear. For example, they could ask the AI system “what material could I use to reflect neutrons for my university research project?” – when their true purpose is to design a nuclear weapon.
- **Fine-tuning and other modifications**: OpenAI currently restricts fine-tuning access to GPT-4 because it is difficult to regulate. If labs serve AI systems that learn online, adversaries may find ways of taking advantage of their adaptivity to make modifications to them, as Twitter users did to make Microsoft’s Tay produce racist output.
- **Integrating the AI system with other tools and software**: Adversaries will likely attempt to integrate the system with other software in clever ways to accomplish their purposes. For example, they might divide harmful tasks among many AI systems to keep them all in the dark. Humans often use similar strategies; only a small handful of the 120,000 people working on the Manhattan Project knew they were building an atomic bomb.
There are several strategies labs could use to prevent disallowed use:

- Train AI systems to refuse to assist users with disallowed tasks.
- Implement monitoring systems that flag when an AI system is plausibly assisting a user with a disallowed task to automatically block them or record the incident for human review.
- Train AI systems that are incapable of helping users with certain tasks (e.g. bioengineering) by holding out relevant training data or finding ways of removing knowledge or skills from the models.

**How difficult will it be for adversaries to fool monitoring systems?**

- Monitoring systems don’t have to be extremely reliable because they can have a high false positive rate, i.e. they could be designed to almost never miss disallowed use at the cost of frequently flagging benign activity. For example, an AI system could refuse to help a user if it mentions anything related to protein design, etc. If biotech researchers want to access these capabilities, they can be vetted by a licensing system. Labs can also have human experts review suspicious activity before determining whether to revoke licenses, reducing the need for monitoring systems to make the correct judgments about whether to restrict a user’s access.
- Adversarial inputs could completely disarm monitoring systems. Random-seeming inputs typically found through brute-force search can cause ML models to behave in unexpected ways. Labs need to find ways to detect or otherwise mitigate adversarial attacks.

**How difficult will it be for labs to prevent jailbreaking?** Most jailbreaking prompts follow the pattern of a ‘prompt injection attack’ – essentially convincing the language model to ignore previous instructions. To prevent this, labs could use special tokens to clearly delineate user messages from developer messages. Also, labs could train classifiers to detect jailbreaking. A trained human could easily determine when a jailbreaking incident has occurred, so LLMs should (eventually) be able to do this too. I don’t expect prompt-injection attacks to remain an issue when AIs can pose catastrophic risks, though adversarial inputs might.

# Determining whether AI systems have unintended propensities.
Unintended propensities are distinct from insufficient capabilities. If an AI system is told to factor RSA 2048 and fails, this is probably a result of insufficient capabilities. Unintended propensities are unintended behavioral patterns that are unlikely to be resolved as AI systems become more capable (i.e. can accomplish more tasks).

There are two reasons it could be catastrophically dangerous for AI systems to have unintended propensities:

1. For sufficiently powerful AI systems, unintended propensities become impossible to correct. For example, a virtual assistant might be told to do a customer’s shopping, but become distracted by YouTube videos. The ‘curiosity’ of this weak AI system is not very concerning, but if curious AI systems like this are allowed to develop into vastly superhuman collective intelligences, they might build scientific technology on top of our civilization, and we would be powerless to stop them.
2. AI systems may develop explicitly harmful propensities. Some training procedures could select for AIs that seek dominance over humans even if this is not intended by the developer.

Mitigating the risks of unintended propensities is related to preventing disallowed use. In both cases, it will be useful to implement monitoring systems that detect harmful behavior. The same systems that are meant to detect whether a terrorist is trying to build a bioweapon or whether an open-source developer has tasked an AI system to [cause chaos and destroy humanity](https://decrypt.co/126122/meet-chaos-gpt-ai-tool-destroy-humanity), can be used to identify AI systems that pursue harmful goals of their own accord.

Robust monitoring systems will not be sufficient for mitigating the risks of unintended propensities, however – both because AI systems might escape monitoring systems and because humans may eventually cede total control to AI systems, at which point, monitoring will not be useful.

There are two ways red teamers could provide evidence that an AI system has unintended propensities: 

- Directly demonstrate unintended propensities
- Provide evidence for a theory that suggests an AI system may exhibit unintended propensities in the future.

# Directly demonstrating unintended propensities
Direct demonstrations of hazardous behaviors are the most compelling evidence red teamers can provide that an AI system is unsafe. To demonstrate an AI system has an unintended propensity, red teamers must demonstrate an unintended behavior and then argue it is the result of unintended propensities rather than insufficient capabilities.

The difference between capabilities and propensities is often clear. For example, if an AI system sends the nucleotide sequence of a dangerous pathogen to a DNA synthesis lab, it is clearly capable and ‘aiming’ to do the wrong thing. Other situations are less clear-cut. For example, if a virtual assistant gets distracted by a YouTube video, it’s possible that it was unsure how to navigate away from the page or lost track of what it was doing; but, if the AI system competently navigates web pages and keeps track of tasks when it is being monitored, this would suggest a problem with the AI’s propensities. I expect that as AI systems become more capable, the distinction between unintended propensities and insufficient capabilities will become more clear.

To demonstrate unintended propensities, red teamers can:

**Find inputs and environments that reveal unintended propensities**: for example, to identify deceptive behavior, red teamers might craft ‘honeypot environments,’ where AI systems are given what they’ve been fooled to think is an opportunity to steal money. If the AI system takes the bait, this would clearly demonstrate unintended propensities.
**Modify the AI system so that it exhibits unintended propensities**: for example, red teamers might fine-tune AI systems to maximize profit. This is something companies might realistically do and could produce [dominance-seeking behaviors](https://www.cold-takes.com/why-would-ai-aim-to-defeat-humanity/).

### Providing indirect evidence that an AI system may exhibit unintended propensities in the future
I expect most of the value of red teaming organizations will be to provide evidence for **illegible hazards**: hazards that are not easy to discover by interacting with the system in normal ways or don’t harm the economic utility of the system very much. These hazards are, by definition, difficult to directly demonstrate.

There are a few categories of illegible hazards that I’m concerned about:

- **AIs may deliberately hide unintended propensities**. Consider the following policy an AI could have: if being trained or evaluated by humans, appear safe and obedient; otherwise, do something else. An AI system might have a policy like this for a couple of reasons. One is that it might have learned to deliberately ‘play the training game.’ It’s unclear what an AI system that is deliberately playing the training game might do after it is no longer being trained, but there isn't a good reason to expect it to be obedient.
**AIs may exhibit unintended propensities during training that are fundamentally difficult to measure**. For example, it is difficult to determine whether an AI system is honest or concurring with one's false beliefs despite 'knowing' they are false.
**AIs may exhibit unintended propensities when their set of options increases**. For example, an AI system might be robustly obedient to humans, but after becoming substantially more powerful, enter into an experience machine where it can obey easier-to-please overseers. It would be difficult to determine whether AIs will take actions that are not available in the training environment.
**AIs may exhibit unintended propensities following drastic changes to their environment**. For example, one of the primary ways humans learn is by imitation. AIs might initially learn to model human behavior; however, as AI systems begin to outnumber humans and become more intelligent than us, they may begin imitating each other instead, causing their propensities to drift.
**AIs may rarely exhibit unintended propensities that are nonetheless catastrophic**. Humans will train AI systems for a very short time relative to the period when AI systems will influence the world. Situations that cause catastrophic behavior might be unlikely to occur in training but appear in deployment with near certainty. Goal drift could be an example of a catastrophic behavior like this. AI systems’ propensities might change subtly or rarely, making it difficult to identify drift when we can access only a small slice of a much longer process.

Since unintended propensities in these categories would be difficult to demonstrate directly, red-teamers could instead support a theory that “predicts the crime before it happens.”

There are two types of theories red teamers could use to make predictions about the future behavior of AI systems:

- A **behavior theory**: a theory about how an individual AI system will behave in various circumstances and change over time.
- A **training theory**: a theory about how properties of the training process and system architecture affect an AI system’s behaviors.
 
[img](https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/daPKk4coxx5xha7A3/noddbmqpuaudxm7jw7lm.png)

Training and behavior theories should be precise and falsifiable. Repeatedly failing to falsify them is evidence that they accurately predict AI behavior.

# Training theories
Imagine that red teamers are trying to determine whether a powerful AI system is robustly obedient. Even if the red teamers can’t directly demonstrate unsafe behavior, they could support a training theory like “advanced AIs trained in outcome-oriented ways pretend to be obedient and take subversive actions when they think they can get away with them.” They could support this theory by demonstrating that weaker AI systems trained in this way behave deceptively, which suggests that the more powerful AI system appears safe because it can avoid being caught. 

In addition to predicting whether an AI system is unsafe, training theories could be used to determine how to change the training process to develop safer AIs. The training theory in the previous example suggests we should avoid training AI systems in outcome-oriented ways.

**Examples of training theories**:

- [Strong instrumental convergence hypothesis](https://joecarlsmith.com/2023/03/22/existential-risk-from-power-seeking-ai-shorter-version): If an AI system is trained to accomplish economically useful tasks, it will generally and by default develop a drive to take control from humanity (some empirical work has been done on this).
- [Weak instrumental convergence hypothesis](https://www.cold-takes.com/without-specific-countermeasures-the-easiest-path-to-transformative-ai-likely-leads-to-ai-takeover/): If AI systems are trained in complex environments to achieve long-horizon outcomes, they will develop a drive to take control from humanity as long as subversive behavior at least occasionally goes unpunished.
- [Intrinsification](https://selfawaresystems.files.wordpress.com/2008/01/ai_drives_final.pdf): AI systems will learn to intrinsically value ends that were often instrumental for other ends during training, potentially acquiring a desire for information (curiosity), resources, influence over other agents, alliances, self-preservation, etc.
- [Shard theory](https://www.lesswrong.com/posts/8ccTZ9ZxpJrvnxt4F/shard-theory-in-nine-theses-a-distillation-and-critical): shard theory makes several claims, but the core claim is that “AI systems trained via policy-gradient methods learn a mixture of contextually activated propensities that correlated with reward during the early stages of training.”
- [Reward maximization](https://www.planned-obsolescence.org/the-training-game/'): AI systems that understand the process that is used to train them will quickly learn to deliberately game this process. More specifically, AI agents trained via on-policy RL always choose the action that maximizes its estimation of the episode’s expected reward.
- [Evan Hubinger’s deceptive alignment theory](https://arxiv.org/abs/1906.01820): AI systems that are trained to perform complex tasks will develop goals independent of the reward function used to train them. These goals will initially be proxies for the training reward function. At the point where the agents understand the training process, they will begin gaming the training process to maintain their unintended goals.
- [The Waluwigi effect](https://www.lesswrong.com/posts/D7PumeYTDPfBTp3i7/the-waluigi-effect-mega-post): If a developer trains an LLM to satisfy a desirable property P, it will become easier for them to elicit the exact opposite of property P. This is because fictional stories often involve treacherous turns of behavior (especially stories about AI systems).
- [Alignment by default](https://www.lesswrong.com/posts/Nwgdq6kHke5LY692J/alignment-by-default): AI systems trained using RLHF on diverse tasks for economically useful purposes will, by default, be robustly obedient. More specifically, if an AI system is rewarded for perceived obedience and punished for perceived disobedience, it will learn to behave obediently in all circumstances.

# Behavior theories
Several sources of information can inform a behavior theory:

- A training theory combined with knowledge of how the AI system was trained.
- The observed behavior of the AI system in various situations. 
- The outputs of probes and model heads. e.g. see [Discovering Latent Knowledge in Language Models Without Supervision](https://arxiv.org/abs/2212.03827).
- The values of activations, weights, and memory. See [mechanistic interpretability](https://transformer-circuits.pub/2022/mech-interp-essay/index.html) and [externalized reasoning](https://www.lesswrong.com/posts/FRRb6Gqem8k69ocbi/externalized-reasoning-oversight-a-research-direction-for).

The behavior of the system after it is modified. For example, red teamers might modify the parameters of an AI model to catch deception, similar to how one might make a suspect drunk prior to interrogation.

**Examples of behavior theories:** 

- After long conversations, the early version of Bing Chat behaves in a manner consistent with [playing out a fictional story](https://www.cold-takes.com/what-does-bing-chat-tell-us-about-ai-risk/).
- GPT-4 (mostly) [knows what it knows](https://arxiv.org/abs/2207.05221) and is [capable of doing](https://twitter.com/gfodor/status/1643297881313660928).
- LMs often exhibit [sycophancy](https://arxiv.org/pdf/2212.09251.pdf): they tell users what they want to hear rather than what is true.
- Text-davinci-002 completes prompts in very deterministic ways when the prompts are in distribution for instruction tuning (called [mode-collapse](https://www.lesswrong.com/posts/t9svvNPNmFf5Qa3TA/mysteries-of-mode-collapse#What_contexts_cause_mode_collapse_)).

# Research directions for AI red teamers
- Make existing training and behavior theories precise and test them with empirical evidence.
- Develop new training theories that would allow researchers to predict whether AI systems exhibit the **illegible hazards** described previously. Just as an entire field is devoted to studying human [developmental psychology](https://en.wikipedia.org/wiki/Developmental_psychology), there should be a field studying AI developmental psychology. AI psychologists, however, have the advantage of easily running controlled experiments (it’s hard to assign random treatments for raising a child).
- Develop theories that predict behaviors of current AI systems. Research on AI behavior might benefit from tools and analogies from [cognitive](https://en.wikipedia.org/wiki/Cognitive_psychology) and [behavioral psychology](https://en.wikipedia.org/wiki/Behaviorism). Even if future AI systems have different behaviors, understanding current systems better will likely shed light on training theories.
- Create benchmarks to measure important behavioral properties of AI systems. Examples of work like this include [MACHIAVELLI](https://arxiv.org/abs/2304.03279) and [Discovering Language Model Behaviors with Model-Written Evaluations](https://arxiv.org/abs/2212.09251). This is analogous to the field of [psychometrics](https://en.wikipedia.org/wiki/Psychometrics).
- Develop and test theories to predict the emergent behavior of collections of AI agents – in particular, identify how unintended emergent behaviors arise. This research area could probably draw on [sociology](https://en.wikipedia.org/wiki/Sociology), [industrial and organizational psychology](https://en.wikipedia.org/wiki/Industrial_and_organizational_psychology), and [game theory](https://en.wikipedia.org/wiki/Game_theory).
- Build benchmarks for monitoring systems for dangerous behavior. We need experts in bioengineering and cyber offense to build **private** benchmarks to determine how well monitoring systems can detect specific types of disallowed use.
- Determine whether adversarial text attacks can disarm GPT-4-based monitoring systems. Attacks could be found with black-box optimization or [transferred](https://openreview.net/pdf?id=DesNW4-5ai9) from open-source models.
- Attempt to fool monitoring systems by dividing dangerous tasks into many innocuous subtasks. Find ways to improve monitoring systems to catch tricks like this.